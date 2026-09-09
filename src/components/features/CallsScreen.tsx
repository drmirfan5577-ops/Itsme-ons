import React, { useState, useEffect } from 'react';
import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed, Search, MoreVertical, PhoneOff, Mic, MicOff, Volume2, VolumeX, X } from 'lucide-react';
import type { CallRecord } from '@/types';
import Avatar from './Avatar';

interface CallsScreenProps {
  calls: CallRecord[];
}

function CallModal({ call, onEnd }: { call: CallRecord; onEnd: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [status, setStatus] = useState<'connecting' | 'connected'>('connecting');

  useEffect(() => {
    const t1 = setTimeout(() => setStatus('connected'), 2000);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (status !== 'connected') return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#1a2e35] to-bg py-16 animate-fade-in">
      {/* Encryption */}
      <div className="flex items-center gap-1.5 text-white/60 text-xs">
        <span>🔒</span> End-to-end encrypted
      </div>

      {/* Avatar + info */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white"
          style={{ backgroundColor: call.avatarColor || '#2a3942' }}>
          {call.name.charAt(0)}
        </div>
        <p className="text-white text-2xl font-bold">{call.name}</p>
        <p className="text-white/60 text-base">
          {status === 'connecting' ? 'Connecting...' : fmt(seconds)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <CallBtn icon={muted ? MicOff : Mic} label={muted ? 'Unmute' : 'Mute'} active={muted} onClick={() => setMuted(!muted)} />
        <CallBtn icon={PhoneOff} label="End" danger onClick={onEnd} />
        <CallBtn icon={speaker ? Volume2 : VolumeX} label="Speaker" active={speaker} onClick={() => setSpeaker(!speaker)} />
      </div>
    </div>
  );
}

function CallBtn({ icon: Icon, label, onClick, active, danger }: { icon: React.ElementType; label: string; onClick: () => void; active?: boolean; danger?: boolean }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${danger ? 'bg-accent-red' : active ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}>
        <Icon size={26} className="text-white" />
      </div>
      <span className="text-white/60 text-xs">{label}</span>
    </button>
  );
}

export default function CallsScreen({ calls }: CallsScreenProps) {
  const [activeCall, setActiveCall] = useState<CallRecord | null>(null);

  return (
    <>
      {activeCall && <CallModal call={activeCall} onEnd={() => setActiveCall(null)} />}
      <div className="flex flex-col h-full bg-bg-light">
        <div className="flex items-center justify-between px-4 py-3 border-b border-bg-lighter">
          <h2 className="text-lg font-bold text-text">Calls</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted"><Search size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted"><MoreVertical size={18} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-bg-lighter/50">
          {calls.map((call) => (
            <div key={call.id} className="flex items-center gap-3 px-4 py-3 hover:bg-bg-lighter/50 transition-colors">
              <Avatar name={call.name} color={call.avatarColor} size="md" />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${call.missed ? 'text-accent-red' : 'text-text'}`}>{call.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {call.type === 'incoming' && !call.missed && <PhoneIncoming size={13} className="text-brand" />}
                  {call.type === 'outgoing' && <PhoneOutgoing size={13} className="text-brand" />}
                  {call.missed && <PhoneMissed size={13} className="text-accent-red" />}
                  <span className="text-xs text-text-muted">{call.time}</span>
                  {call.duration && <span className="text-xs text-text-muted">· {call.duration}</span>}
                </div>
              </div>
              <button
                onClick={() => setActiveCall(call)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg-lighter text-brand transition-colors"
              >
                {call.callType === 'video' ? <Video size={20} /> : <Phone size={20} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
