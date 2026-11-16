export const CURRENT_USER = {
  name: 'You',
  initials: 'YO',
  color: '#E63950',
  homeCity: 'Amsterdam',
  profileCompletionPct: 63,
};

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'food', label: 'Food & Drinks' },
  { id: 'outdoors', label: 'Outdoors' },
  { id: 'culture', label: 'Culture' },
];

export const TRAVELERS = [
  { id: 't1', name: 'Mia', initials: 'MI', color: '#F5A623', country: '🇦🇺', x: 22, y: 28 },
  { id: 't2', name: 'Jonas', initials: 'JO', color: '#3B82F6', country: '🇩🇪', x: 34, y: 18 },
  { id: 't3', name: 'Priya', initials: 'PR', color: '#8B5CF6', country: '🇮🇳', x: 55, y: 15 },
  { id: 't4', name: 'Diego', initials: 'DI', color: '#2FB380', country: '🇧🇷', x: 68, y: 26 },
  { id: 't5', name: 'Sana', initials: 'SA', color: '#E63950', country: '🇹🇷', x: 46, y: 40 },
  { id: 't6', name: 'Kenji', initials: 'KE', color: '#F5A623', country: '🇯🇵', x: 26, y: 55 },
  { id: 't7', name: 'Lotte', initials: 'LO', color: '#3B82F6', country: '🇳🇱', x: 62, y: 58 },
  { id: 't8', name: 'Omar', initials: 'OM', color: '#8B5CF6', country: '🇪🇬', x: 74, y: 48 },
  { id: 't9', name: 'Ines', initials: 'IN', color: '#2FB380', country: '🇵🇹', x: 40, y: 68 },
  { id: 't10', name: 'Cole', initials: 'CO', color: '#E63950', country: '🇺🇸', x: 18, y: 72 },
];

export const EVENTS = [
  {
    id: 'e1',
    category: 'nightlife',
    icon: 'wine-outline',
    color: '#8B5CF6',
    title: 'Khao San pub crawl w/ mad monkey 🐒',
    host: { name: 'Luke', initials: 'LU', color: '#3B82F6' },
    description:
      'Predrinks, free shots & a wild Khao San night. Meet travelers from everywhere, grab a singlet & party till late. Happening sun & wed 8pm.',
    schedule: 'Sun & Wed · 8:00 PM',
    price: '$28',
    attendeesCount: 47,
    attendees: ['MI', 'JO', 'PR', 'DI', 'SA'],
    sponsored: true,
    sponsor: 'Mad Monkey Hostels',
    x: 40, y: 34,
  },
  {
    id: 'e2',
    category: 'food',
    icon: 'restaurant-outline',
    color: '#F5A623',
    title: 'Canal-side tapas & wine night',
    host: { name: 'Sana', initials: 'SA', color: '#E63950' },
    description:
      "Small-plate tapas crawl along three canal bars, finishing with a rooftop nightcap. Solo travelers only — come make friends.",
    schedule: 'Fri · 7:00 PM',
    price: '$18',
    attendeesCount: 12,
    attendees: ['KE', 'LO', 'OM'],
    sponsored: false,
    x: 58, y: 45,
  },
  {
    id: 'e3',
    category: 'outdoors',
    icon: 'bicycle-outline',
    color: '#2FB380',
    title: 'Sunrise bike ride to Vondelpark',
    host: { name: 'Ines', initials: 'IN', color: '#2FB380' },
    description:
      'Rent a bike and join a chill group ride through the park before the city wakes up. Coffee stop included.',
    schedule: 'Sat · 6:30 AM',
    price: 'Free',
    attendeesCount: 9,
    attendees: ['CO', 'DI'],
    sponsored: false,
    x: 30, y: 62,
  },
  {
    id: 'e4',
    category: 'culture',
    icon: 'color-palette-outline',
    color: '#3B82F6',
    title: 'Street art walking tour',
    host: { name: 'Jonas', initials: 'JO', color: '#3B82F6' },
    description:
      'Self-guided-turned-social walking tour through the best murals in the city, ending at a local brewery.',
    schedule: 'Today · 4:00 PM',
    price: '$10',
    attendeesCount: 21,
    attendees: ['MI', 'SA', 'KE', 'OM'],
    sponsored: false,
    x: 66, y: 20,
  },
  {
    id: 'e5',
    category: 'nightlife',
    icon: 'musical-notes-outline',
    color: '#8B5CF6',
    title: 'Rooftop house music sunset set',
    host: { name: 'Priya', initials: 'PR', color: '#8B5CF6' },
    description:
      'Local DJ, skyline views, and a crowd of travelers from 20+ countries. Cash bar, no cover before 7.',
    schedule: 'Today · 6:00 PM',
    price: '$15',
    attendeesCount: 34,
    attendees: ['LO', 'DI', 'CO'],
    sponsored: false,
    x: 50, y: 55,
  },
];

export const HOSTELS = [
  { id: 'h1', name: 'Yardpark Hostel', price: '$106', x: 24, y: 46 },
  { id: 'h2', name: 'Centrum Beds', price: '$110', x: 70, y: 62 },
];

export const CONVERSATIONS = [
  {
    id: 'c1',
    name: 'Luke',
    initials: 'LU',
    color: '#3B82F6',
    lastMessage: "See you at the pub crawl tonight? 🍻",
    time: '2m',
    unread: 2,
  },
  {
    id: 'c2',
    name: 'Sana',
    initials: 'SA',
    color: '#E63950',
    lastMessage: 'Sent you the tapas bar location',
    time: '25m',
    unread: 1,
  },
  {
    id: 'c3',
    name: 'Amsterdam Travelers',
    initials: 'AT',
    color: '#2FB380',
    lastMessage: 'Kenji: anyone up for the bike ride sat?',
    time: '1h',
    unread: 0,
    group: true,
  },
  {
    id: 'c4',
    name: 'Ines',
    initials: 'IN',
    color: '#2FB380',
    lastMessage: 'Nice meeting you at the hostel!',
    time: '1d',
    unread: 0,
  },
];

export const NOTIFICATIONS = [
  {
    id: 'n1',
    icon: 'person-add-outline',
    color: '#E63950',
    text: 'Luke invited you to Khao San pub crawl',
    time: '10m',
  },
  {
    id: 'n2',
    icon: 'people-outline',
    color: '#3B82F6',
    text: '3 new travelers checked in near you',
    time: '32m',
  },
  {
    id: 'n3',
    icon: 'chatbubble-outline',
    color: '#2FB380',
    text: 'Sana sent you a message',
    time: '1h',
  },
  {
    id: 'n4',
    icon: 'star-outline',
    color: '#F5A623',
    text: 'Your profile is 63% complete — add a bio to get more invites',
    time: '3h',
  },
];
