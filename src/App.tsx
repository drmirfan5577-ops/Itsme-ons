import React, { useState, useCallback } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatList from '@/components/features/ChatList';
import ChatView from '@/components/features/ChatView';
import StatusScreen from '@/components/features/StatusScreen';
import CallsScreen from '@/components/features/CallsScreen';
import CommunitiesScreen from '@/components/features/CommunitiesScreen';
import SettingsScreen from '@/components/features/SettingsScreen';
import EmptyState from '@/components/features/EmptyState';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  defaultChats, defaultMessages, defaultStatus, defaultCalls,
} from '@/constants/data';
import type { Chat, Message, ActivePanel } from '@/types';
import { formatTime } from '@/lib/utils';

export default function App() {
  const [chats, setChats] = useLocalStorage('itsme_chats', defaultChats);
  const [messages, setMessages] = useLocalStorage<Record<string, Message[]>>('itsme_messages', defaultMessages);
  const [status] = useLocalStorage('itsme_status', defaultStatus);
  const [calls] = useLocalStorage('itsme_calls', defaultCalls);

  const [activePanel, setActivePanel] = useState<ActivePanel>('chats');
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  const totalUnread = chats.reduce((sum, c) => sum + c.unread, 0);

  const handleSelectChat = useCallback((chat: Chat) => {
    setActiveChat(chat);
    // Clear unread
    setChats((prev) =>
      prev.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c))
    );
  }, [setChats]);

  const handleSend = useCallback((text: string, type: Message['type'] = 'text') => {
    if (!activeChat) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sent: true,
      time: formatTime(new Date()),
      status: 'sent',
      starred: false,
      type,
      synced: false,
    };
    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? { ...c, lastMessage: text, time: formatTime(new Date()) }
          : c
      )
    );
  }, [activeChat, setMessages, setChats]);

  const handleCall = useCallback((_type: 'voice' | 'video') => {
    // Call handled inside CallsScreen modal
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const renderRightPanel = () => {
    if (activePanel === 'status') return <StatusScreen status={status} />;
    if (activePanel === 'communities') return <CommunitiesScreen />;
    if (activePanel === 'calls') return <CallsScreen calls={calls} />;
    if (activePanel === 'settings') return <SettingsScreen darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />;

    // Chats panel
    if (activeChat) {
      return (
        <ChatView
          chat={activeChat}
          messages={messages[activeChat.id] || []}
          onBack={() => setActiveChat(null)}
          onSend={handleSend}
          onCall={handleCall}
          isMobile={isMobile}
        />
      );
    }
    return <EmptyState />;
  };

  return (
    <div className="flex h-full bg-bg overflow-hidden">
      {/* Sidebar icons */}
      <Sidebar active={activePanel} onChange={setActivePanel} totalUnread={totalUnread} />

      {/* Left panel: chat list (always visible for chats, otherwise replaced) */}
      <div
        className={`w-80 xl:w-96 flex-shrink-0 border-r border-bg-lighter flex flex-col overflow-hidden
          ${activePanel !== 'chats' ? 'hidden md:flex' : 'flex'}`}
      >
        {activePanel === 'chats' ? (
          <ChatList chats={chats} activeId={activeChat?.id ?? null} onSelect={handleSelectChat} />
        ) : null}
      </div>

      {/* Right / main panel */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {renderRightPanel()}
      </div>
    </div>
  );
}
