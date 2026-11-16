const express = require('express');
const cors = require('cors');
const db = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const findEvent = (id) => db.events.find((e) => e.id === id);
const withFlags = (e) => ({
  ...e,
  joined: db.state.joinedEventIds.has(e.id),
  saved: db.state.savedEventIds.has(e.id),
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ---- Map data ----
app.get('/api/categories', (_req, res) => res.json(db.CATEGORIES));
app.get('/api/travelers', (_req, res) => res.json(db.travelers));
app.get('/api/hostels', (_req, res) => res.json(db.hostels));

// ---- Events ----
// GET /api/events?category=nightlife
app.get('/api/events', (req, res) => {
  const { category } = req.query;
  const visible = db.events.filter(
    (e) => !db.state.notInterestedIds.has(e.id) && (!category || category === 'all' || e.category === category)
  );
  res.json(visible.map(withFlags));
});

app.get('/api/events/:id', (req, res) => {
  const ev = findEvent(req.params.id);
  if (!ev) return res.status(404).json({ error: 'Event not found' });
  res.json(withFlags(ev));
});

app.post('/api/events/:id/join', (req, res) => {
  const ev = findEvent(req.params.id);
  if (!ev) return res.status(404).json({ error: 'Event not found' });
  if (!db.state.joinedEventIds.has(ev.id)) {
    db.state.joinedEventIds.add(ev.id);
    ev.attendeesCount += 1;
  }
  res.json(withFlags(ev));
});

app.post('/api/events/:id/save', (req, res) => {
  const ev = findEvent(req.params.id);
  if (!ev) return res.status(404).json({ error: 'Event not found' });
  if (db.state.savedEventIds.has(ev.id)) db.state.savedEventIds.delete(ev.id);
  else db.state.savedEventIds.add(ev.id);
  res.json(withFlags(ev));
});

app.post('/api/events/:id/not-interested', (req, res) => {
  const ev = findEvent(req.params.id);
  if (!ev) return res.status(404).json({ error: 'Event not found' });
  db.state.notInterestedIds.add(ev.id);
  res.json({ ok: true });
});

// Saved screen: joined + saved events
app.get('/api/me/saved', (_req, res) => {
  res.json({
    going: db.events.filter((e) => db.state.joinedEventIds.has(e.id)).map(withFlags),
    saved: db.events.filter((e) => db.state.savedEventIds.has(e.id)).map(withFlags),
  });
});

// ---- Profile ----
app.get('/api/me', (_req, res) => {
  res.json({ ...db.user, eventsJoined: db.state.joinedEventIds.size });
});

// ---- Chat ----
app.get('/api/conversations', (_req, res) => {
  res.json(
    db.conversations.map(({ messages, ...c }) => ({
      ...c,
      lastMessage: messages[messages.length - 1]?.text ?? '',
    }))
  );
});

app.get('/api/conversations/:id/messages', (req, res) => {
  const convo = db.conversations.find((c) => c.id === req.params.id);
  if (!convo) return res.status(404).json({ error: 'Conversation not found' });
  convo.unread = 0;
  res.json(convo.messages);
});

app.post('/api/conversations/:id/messages', (req, res) => {
  const convo = db.conversations.find((c) => c.id === req.params.id);
  if (!convo) return res.status(404).json({ error: 'Conversation not found' });
  const text = (req.body?.text ?? '').toString().trim();
  if (!text) return res.status(400).json({ error: 'text is required' });
  const msg = { id: `m${convo.messages.length + 1}`, fromMe: true, text };
  convo.messages.push(msg);
  res.status(201).json(msg);
});

// ---- Notifications ----
app.get('/api/notifications', (_req, res) => res.json(db.notifications));

app.post('/api/notifications/read-all', (_req, res) => {
  db.notifications.forEach((n) => (n.read = true));
  res.json({ ok: true });
});

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => console.log(`NomadTable API running on http://localhost:${PORT}`));
