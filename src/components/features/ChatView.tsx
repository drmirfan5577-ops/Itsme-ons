import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft, Phone, Video, Search, MoreVertical,
  Smile, Paperclip, Mic, Send, X, Lock, Star,
  CheckCheck, Check, Clock, Reply, Trash2, Forward,
  Image, FileText, MapPin, UserPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils';
import { EMOJIS } from '@/constants/data';
import type { Chat, Message } from '@/types';
import Avatar from './Avatar';

interface ChatViewProps {
  chat: Chat;
  messages: Message[];
  onBack: () => void;
  onSend: (text: string, type?: Message['type']) => void;
  onCall: (type: 'voice' | 'video') => void;
  isMobile?: boolean;
}

function MessageStatus({ msg }: { msg: Message }) {
  if (!msg.sent) return null;
  if (msg.status === 'pending') return <Clock size={12} className="text-accent-orange" />;
  if (msg.status === 'read') return <CheckCheck size={12} className="text-accent-blue" />;
  if (msg.status === 'delivered') return <CheckCheck size={12} className="text-text-muted" />;
  return <Check size={12} className="text-text-muted" />;
}

export default function ChatView({ chat, messages, onBack, onSend, onCall, isMobile }: ChatViewProps) {
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [chat.id]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text, 'text');
    setInput('');
    setReplyTo(null);
    setShowEmoji(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const visibleMessages = searchQuery
    ? messages.filter((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-bg-light border-b border-bg-lighter flex-shrink-0">
        {isMobile && (
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted">
            <ArrowLeft size={20} />
          </button>
        )}
        <Avatar name={chat.name} color={chat.avatarColor} isGroup={chat.group} online={chat.online} size="sm" />
        <div className="flex-1 min-w-0 ml-1">
          <p className="text-sm font-semibold text-text truncate">{chat.name}</p>
          <p className="text-xs text-text-muted">
            {chat.typing ? (
              <span className="text-brand">typing...</span>
            ) : chat.online ? (
              'online'
            ) : chat.group ? (
              `${chat.members} members`
            ) : (
              'last seen today at 9:30 AM'
            )}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => onCall('video')} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted hover:text-text transition-colors">
            <Video size={20} />
          </button>
          <button onClick={() => onCall('voice')} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted hover:text-text transition-colors">
            <Phone size={20} />
          </button>
          <button onClick={() => setShowSearch(!showSearch)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted hover:text-text transition-colors">
            <Search size={20} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted hover:text-text transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="flex items-center gap-2 px-3 py-2 bg-bg-light border-b border-bg-lighter animate-fade-in">
          <Search size={16} className="text-text-muted" />
          <input
            autoFocus
            className="flex-1 bg-transparent text-text text-sm outline-none placeholder:text-text-muted"
            placeholder="Search in conversation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => { setShowSearch(false); setSearchQuery(''); }}>
            <X size={18} className="text-text-muted hover:text-text" />
          </button>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-bg px-4 py-4 space-y-1">
        {/* Encryption notice */}
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center gap-1.5 bg-bg/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <Lock size={11} className="text-accent-yellow" />
            <span className="text-[11px] text-accent-yellow">Messages are end-to-end encrypted</span>
          </div>
        </div>

        {visibleMessages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex', msg.sent ? 'justify-end' : 'justify-start')}
            onDoubleClick={() => setSelectedMsg(msg === selectedMsg ? null : msg)}
          >
            <div
              className={cn(
                'max-w-[65%] rounded-lg px-3 py-2 relative group cursor-pointer',
                msg.sent ? 'bg-bubble-sent rounded-tr-none' : 'bg-bubble-received rounded-tl-none',
                starredIds.has(msg.id) && 'ring-1 ring-accent-yellow'
              )}
            >
              {/* Group sender name */}
              {chat.group && !msg.sent && msg.sender && (
                <p className="text-xs font-semibold text-brand mb-0.5">{msg.sender}</p>
              )}
              <p className="text-sm text-text leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
              <div className={cn('flex items-center gap-1 mt-0.5', msg.sent ? 'justify-end' : 'justify-start')}>
                {starredIds.has(msg.id) && <Star size={10} className="text-accent-yellow fill-accent-yellow" />}
                <span className="text-[10px] text-text-muted">{msg.time}</span>
                <MessageStatus msg={msg} />
              </div>

              {/* Hover actions */}
              <div className={cn(
                'absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-bg-lighter rounded-full shadow-lg px-1 py-0.5',
                msg.sent ? '-left-20' : '-right-20'
              )}>
                <button
                  onClick={(e) => { e.stopPropagation(); setReplyTo(msg); }}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-bg text-text-muted hover:text-text"
                >
                  <Reply size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setStarredIds(prev => { const n = new Set(prev); n.has(msg.id) ? n.delete(msg.id) : n.add(msg.id); return n; }); }}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-bg text-text-muted hover:text-text"
                >
                  <Star size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected message actions */}
      {selectedMsg && (
        <div className="flex items-center justify-around px-4 py-2 bg-bg-light border-t border-bg-lighter animate-fade-in flex-shrink-0">
          <ActionBtn icon={Reply} label="Reply" onClick={() => { setReplyTo(selectedMsg); setSelectedMsg(null); }} />
          <ActionBtn icon={Star} label="Star" onClick={() => { setStarredIds(prev => { const n = new Set(prev); n.has(selectedMsg.id) ? n.delete(selectedMsg.id) : n.add(selectedMsg.id); return n; }); setSelectedMsg(null); }} />
          <ActionBtn icon={Forward} label="Forward" onClick={() => setSelectedMsg(null)} />
          <ActionBtn icon={Trash2} label="Delete" danger onClick={() => setSelectedMsg(null)} />
          <ActionBtn icon={X} label="Close" onClick={() => setSelectedMsg(null)} />
        </div>
      )}

      {/* Reply bar */}
      {replyTo && (
        <div className="flex items-center gap-3 px-4 py-2 bg-bg-lighter border-l-4 border-brand flex-shrink-0 animate-fade-in">
          <Reply size={16} className="text-brand flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-brand">{replyTo.sent ? 'You' : chat.name}</p>
            <p className="text-xs text-text-muted truncate">{replyTo.text}</p>
          </div>
          <button onClick={() => setReplyTo(null)}>
            <X size={16} className="text-text-muted hover:text-text" />
          </button>
        </div>
      )}

      {/* Emoji picker */}
      {showEmoji && (
        <div className="flex flex-wrap gap-1 px-3 py-2 bg-bg-light border-t border-bg-lighter max-h-28 overflow-y-auto animate-fade-in flex-shrink-0">
          {EMOJIS.map((emoji, i) => (
            <button
              key={i}
              onClick={() => { setInput(prev => prev + emoji); setShowEmoji(false); inputRef.current?.focus(); }}
              className="w-8 h-8 flex items-center justify-center text-lg hover:bg-bg-lighter rounded transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-end gap-2 px-3 py-2.5 bg-bg-light border-t border-bg-lighter flex-shrink-0">
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted hover:text-text transition-colors flex-shrink-0"
        >
          <Smile size={22} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted hover:text-text transition-colors flex-shrink-0">
          <Paperclip size={22} />
        </button>
        <div className="flex-1 bg-bg rounded-2xl px-4 py-2 min-h-[40px] max-h-28 flex items-end">
          <textarea
            ref={inputRef}
            rows={1}
            className="w-full bg-transparent text-sm text-text placeholder:text-text-muted outline-none resize-none leading-relaxed max-h-24 overflow-y-auto"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ height: 'auto', minHeight: '20px' }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = 'auto';
              t.style.height = Math.min(t.scrollHeight, 96) + 'px';
            }}
          />
        </div>
        <button
          onClick={input.trim() ? handleSend : undefined}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-brand hover:bg-brand-dark transition-colors text-white flex-shrink-0"
        >
          {input.trim() ? <Send size={18} /> : <Mic size={18} />}
        </button>
      </div>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, onClick, danger }: { icon: React.ElementType; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5">
      <div className={cn('w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg transition-colors', danger ? 'text-accent-red' : 'text-text-muted hover:text-text')}>
        <Icon size={18} />
      </div>
      <span className={cn('text-[10px]', danger ? 'text-accent-red' : 'text-text-muted')}>{label}</span>
    </button>
  );
}
