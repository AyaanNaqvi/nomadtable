import React, { createContext, useContext, useState } from 'react';
import { CURRENT_USER, CONVERSATIONS, NOTIFICATIONS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [joinedEventIds, setJoinedEventIds] = useState([]);
  const [notInterestedIds, setNotInterestedIds] = useState([]);
  const [savedEventIds, setSavedEventIds] = useState([]);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [conversations] = useState(CONVERSATIONS);

  const unreadChatCount = conversations.reduce((sum, c) => sum + c.unread, 0);
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const actions = {
    joinEvent: (id) => setJoinedEventIds((prev) => [...new Set([...prev, id])]),
    toggleSaveEvent: (id) =>
      setSavedEventIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      ),
    markNotInterested: (id) => setNotInterestedIds((prev) => [...new Set([...prev, id])]),
    markAllNotificationsRead: () =>
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
  };

  return (
    <AppContext.Provider
      value={{
        user: CURRENT_USER,
        joinedEventIds,
        notInterestedIds,
        savedEventIds,
        notifications,
        conversations,
        unreadChatCount,
        unreadNotifCount,
        actions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
