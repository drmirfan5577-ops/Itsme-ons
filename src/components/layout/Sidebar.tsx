import React from 'react';
import {
  MessageSquare, Radio, Users, Phone, Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActivePanel } from '@/types';

interface SidebarProps {
  active: ActivePanel;
  onChange: (panel: ActivePanel) => void;
  totalUnread: number;
}

const navItems: { id: ActivePanel; icon: React.ElementType; label: string }[] = [
  { id: 'chats', icon: MessageSquare, label: 'Chats' },
  { id: 'status', icon: Radio, label: 'Updates' },
  { id: 'communities', icon: Users, label: 'Communities' },
  { id: 'calls', icon: Phone, label: 'Calls' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ active, onChange, totalUnread }: SidebarProps) {
  return (
    <div className="w-full h-16 md:h-auto md:w-16 flex flex-row md:flex-col items-center px-2 md:px-0 md:py-4 bg-bg-light border-t md:border-t-0 md:border-r border-bg-lighter gap-1 flex-shrink-0 pb-[env(safe-area-inset-bottom)]">
      {/* Logo */}
      <div className="hidden md:flex w-10 h-10 rounded-full bg-brand items-center justify-center mb-4 flex-shrink-0">
        <MessageSquare size={20} className="text-white" fill="white" />
      </div>

      <nav className="flex flex-row md:flex-col justify-around md:justify-start gap-1 flex-1 w-full items-center">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            title={label}
            aria-label={label}
            className={cn(
              'relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 group',
              active === id
                ? 'bg-bg-lighter text-brand'
                : 'text-text-muted hover:bg-bg-lighter hover:text-text'
            )}
          >
            <Icon size={22} />
            {id === 'chats' && totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {totalUnread > 99 ? '99+' : totalUnread}
              </span>
            )}
            <span className="hidden md:block absolute left-14 bg-bg-lighter text-text text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
