import React, { useState } from 'react';
import { Search, MoreVertical, Edit3, CheckCheck, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Chat } from '@/types';
import Avatar from './Avatar';

interface ChatListProps {
  chats: Chat[];
  activeId: string | null;
  onSelect: (chat: Chat) => void;
}

type FilterType = 'all' | 'unread' | 'groups' | 'pinned';

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'groups', label: 'Groups' },
  { id: 'pinned', label: 'Pinned' },
];

function StatusIcon({ status }: { status: string }) {
  if (status === 'read') return <CheckCheck size={14} className="text-accent-blue flex-shrink-0" />;
  if (status === 'delivered') return <CheckCheck size={14} className="text-text-muted flex-shrink-0" />;
  if (status === 'sent') return <Check size={14} className="text-text-muted flex-shrink-0" />;
  if (status === 'pending') return <Clock size={14} className="text-accent-orange flex-shrink-0" />;
  return null;
}

export default function ChatList({ chats, activeId, onSelect }: ChatListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = chats.filter((c) => {
    if (filter === 'unread' && c.unread === 0) return false;
    if (filter === 'groups' && !c.group) return false;
    if (filter === 'pinned' && !c.pinned) return false;
    return c.name.toLowerCase().includes(search.toLowerCase());
  });

  const pinned = filtered.filter((c) => c.pinned);
  const others = filtered.filter((c) => !c.pinned);

  return (
    <div className="flex flex-col h-full bg-bg-light">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-bg-lighter">
        <h1 className="text-lg font-bold text-text">Chats</h1>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted hover:text-text transition-colors">
            <Edit3 size={18} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted hover:text-text transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 bg-bg px-3 h-9 rounded-lg">
          <Search size={16} className="text-text-muted flex-shrink-0" />
          <input
            className="flex-1 bg-transparent text-text text-sm placeholder:text-text-muted outline-none"
            placeholder="Search or start new chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-3 pb-2 overflow-x-auto hide-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all',
              filter === f.id
                ? 'bg-brand text-white'
                : 'bg-bg text-text-muted hover:text-text hover:bg-bg-lighter'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {pinned.length > 0 && (
          <>
            <div className="px-4 py-1.5">
              <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Pinned</span>
            </div>
            {pinned.map((chat) => (
              <ChatRow key={chat.id} chat={chat} active={chat.id === activeId} onPress={onSelect} />
            ))}
            {others.length > 0 && (
              <div className="px-4 py-1.5 mt-1">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">All Chats</span>
              </div>
            )}
          </>
        )}
        {others.map((chat) => (
          <ChatRow key={chat.id} chat={chat} active={chat.id === activeId} onPress={onSelect} />
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-text-muted">
            <Search size={28} className="mb-2 opacity-40" />
            <p className="text-sm">No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatRow({ chat, active, onPress }: { chat: Chat; active: boolean; onPress: (c: Chat) => void }) {
  return (
    <button
      onClick={() => onPress(chat)}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left',
        active ? 'bg-bg-lighter' : 'hover:bg-bg-lighter/60'
      )}
    >
      <Avatar
        name={chat.name}
        color={chat.avatarColor}
        isGroup={chat.group}
        online={chat.online}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-sm font-medium text-text truncate flex items-center gap-1">
            {chat.pinned && <span className="text-xs">📌</span>}
            {chat.muted && <span className="text-xs">🔇</span>}
            {chat.name}
          </span>
          <span className={cn('text-[11px] flex-shrink-0 ml-1', chat.unread > 0 ? 'text-brand' : 'text-text-muted')}>
            {chat.time}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            {!chat.group && <StatusIcon status="read" />}
            <span className={cn('text-xs truncate', chat.typing ? 'text-brand italic' : 'text-text-muted')}>
              {chat.typing ? 'typing...' : chat.lastMessage}
            </span>
          </div>
          {chat.unread > 0 && (
            <span className={cn(
              'text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 flex-shrink-0',
              chat.muted ? 'bg-text-muted text-bg' : 'bg-brand text-white'
            )}>
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
