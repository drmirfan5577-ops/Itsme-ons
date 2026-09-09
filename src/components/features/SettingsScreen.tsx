import React, { useState } from 'react';
import {
  Shield, Lock, MessageSquare, Bell, HelpCircle,
  ChevronRight, Moon, Sun, Globe, Palette, Info,
  HardDrive, Trash2, LogOut, User,
} from 'lucide-react';
import Avatar from './Avatar';

interface SettingsScreenProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

function SettingRow({
  icon: Icon,
  label,
  sub,
  value,
  onClick,
  danger,
  toggle,
  toggleValue,
}: {
  icon: React.ElementType;
  label: string;
  sub?: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
  toggle?: boolean;
  toggleValue?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-bg-lighter/40 transition-colors text-left border-b border-bg-lighter/30"
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${danger ? 'bg-accent-red/10' : 'bg-bg-lighter'}`}>
        <Icon size={18} className={danger ? 'text-accent-red' : 'text-text-muted'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${danger ? 'text-accent-red' : 'text-text'}`}>{label}</p>
        {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
      </div>
      {toggle ? (
        <div className={`w-10 h-5.5 rounded-full transition-colors relative flex-shrink-0 ${toggleValue ? 'bg-brand' : 'bg-bg-lighter'}`}
          style={{ width: 40, height: 22 }}>
          <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform shadow`}
            style={{ width: 18, height: 18, transform: toggleValue ? 'translateX(20px)' : 'translateX(2px)' }} />
        </div>
      ) : value ? (
        <span className="text-xs text-text-muted mr-1">{value}</span>
      ) : null}
      {!toggle && <ChevronRight size={16} className="text-text-muted flex-shrink-0" />}
    </button>
  );
}

export default function SettingsScreen({ darkMode, onToggleDark }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col h-full bg-bg-light">
      <div className="px-4 py-3 border-b border-bg-lighter">
        <h2 className="text-lg font-bold text-text">Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile card */}
        <div className="flex items-center gap-4 px-5 py-5 border-b border-bg-lighter hover:bg-bg-lighter/40 cursor-pointer transition-colors">
          <Avatar name="User" size="lg" color="#2a3942" />
          <div className="flex-1">
            <p className="text-base font-bold text-text">User Name</p>
            <p className="text-xs text-text-muted mt-0.5">Hey there! I am using It's Me</p>
          </div>
          <ChevronRight size={18} className="text-text-muted" />
        </div>

        {/* Account settings */}
        <div className="mt-2">
          <p className="px-5 py-2 text-xs font-semibold text-brand uppercase tracking-wider">Account</p>
          <SettingRow icon={User} label="Account" sub="Security notifications, change number" />
          <SettingRow icon={Lock} label="Privacy" sub="Block contacts, disappearing messages" />
          <SettingRow icon={Shield} label="Security" sub="Two-step verification" />
        </div>

        <div className="mt-2">
          <p className="px-5 py-2 text-xs font-semibold text-brand uppercase tracking-wider">Preferences</p>
          <SettingRow
            icon={darkMode ? Moon : Sun}
            label="Dark mode"
            sub="Switch between light and dark theme"
            toggle
            toggleValue={darkMode}
            onClick={onToggleDark}
          />
          <SettingRow
            icon={Bell}
            label="Notifications"
            sub="Message and call tones"
            toggle
            toggleValue={notifications}
            onClick={() => setNotifications(!notifications)}
          />
          <SettingRow icon={MessageSquare} label="Chats" sub="Theme, wallpapers, chat history" />
          <SettingRow icon={Globe} label="Language" value="English" />
          <SettingRow icon={Palette} label="Theme" value="Default" />
        </div>

        <div className="mt-2">
          <p className="px-5 py-2 text-xs font-semibold text-brand uppercase tracking-wider">Storage</p>
          <SettingRow icon={HardDrive} label="Storage and data" value="2.4 MB" />
          <SettingRow icon={Trash2} label="Clear chat cache" sub="Free up storage space" />
        </div>

        <div className="mt-2">
          <p className="px-5 py-2 text-xs font-semibold text-brand uppercase tracking-wider">Support</p>
          <SettingRow icon={HelpCircle} label="Help" sub="Help center, contact us, privacy policy" />
          <SettingRow icon={Info} label="App info" value="v1.0.0" />
        </div>

        <div className="mt-2 mb-6">
          <SettingRow icon={LogOut} label="Log out" danger />
        </div>

        <div className="text-center py-4">
          <p className="text-xs text-text-muted">It's Me · Version 1.0.0</p>
          <p className="text-xs text-text-muted mt-0.5">Made with ❤️ — End-to-End Encrypted</p>
        </div>
      </div>
    </div>
  );
}
