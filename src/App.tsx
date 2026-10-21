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
import { useIsMobile } from '@/hooks/use-mobile';
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
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(true);

  const totalUnread = chats.reduce((sum, c) => sum + c.unread, 0);

  const handleSelectChat = useCallback((chat: Chat) => {
    setActiveChatId(chat.id);
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

  const handlePanelChange = useCallback((panel: ActivePanel) => {
    setActivePanel(panel);
    if (panel !== 'chats') setActiveChatId(null);
  }, []);

  const showChatList = activePanel === 'chats';
  // On phones only one pane fits: the list, or the open conversation / other screen
  const hideListOnMobile = showChatList && !!activeChat;
  const hideMainOnMobile = showChatList && !activeChat;

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
          onBack={() => setActiveChatId(null)}
          onSend={handleSend}
          onCall={handleCall}
          isMobile={isMobile}
        />
      );
    }
    return <EmptyState />;
  };

  return (
    <div className="flex flex-col-reverse md:flex-row h-full bg-bg overflow-hidden">
      {/* Navigation: bottom bar on phones, icon rail on larger screens */}
      <div className={hideListOnMobile ? 'hidden md:flex' : 'flex'}>
        <Sidebar active={activePanel} onChange={handlePanelChange} totalUnread={totalUnread} />
      </div>

      {/* Chat list (chats panel only) */}
      {showChatList && (
        <div
          className={`w-full md:w-80 xl:w-96 flex-1 md:flex-none min-h-0 border-r border-bg-lighter flex-col overflow-hidden
            ${hideListOnMobile ? 'hidden md:flex' : 'flex'}`}
        >
          <ChatList chats={chats} activeId={activeChat?.id ?? null} onSelect={handleSelectChat} />
        </div>
      )}

      {/* Right / main panel */}
      <div className={`flex-1 flex-col overflow-hidden min-w-0 min-h-0 ${hideMainOnMobile ? 'hidden md:flex' : 'flex'}`}>
        {renderRightPanel()}
      </div>
    </div>
  );
}
