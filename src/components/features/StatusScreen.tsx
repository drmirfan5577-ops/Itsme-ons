import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Plus, Camera, X, Edit3 } from 'lucide-react';
import type { StatusItem } from '@/types';
import Avatar from './Avatar';

interface StatusScreenProps {
  status: StatusItem[];
}

function StatusViewer({ item, onClose }: { item: StatusItem; onClose: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { onClose(); return 100; }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col animate-fade-in">
      {/* Progress bar */}
      <div className="h-1 bg-white/20 mx-3 mt-3 rounded-full">
        <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={onClose}>
          <X size={26} className="text-white" />
        </button>
        <Avatar name={item.name} color={item.avatarColor} size="sm" />
        <div className="flex-1">
          <p className="text-white text-sm font-semibold">{item.name}</p>
          <p className="text-white/60 text-xs">{item.time}</p>
        </div>
        <button><MoreVertical size={22} className="text-white/70" /></button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        {item.type === 'image' && item.imageUrl ? (
          <img src={item.imageUrl} alt="status" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-12" style={{ backgroundColor: item.bgColor || '#00a884' }}>
            <p className="text-white text-2xl text-center font-medium leading-relaxed">{item.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StatusScreen({ status }: StatusScreenProps) {
  const [viewing, setViewing] = useState<StatusItem | null>(null);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());

  const unseen = status.filter((s) => !s.seen && !seenIds.has(s.id));
  const seen = status.filter((s) => s.seen || seenIds.has(s.id));

  const handleView = (item: StatusItem) => {
    setViewing(item);
    setSeenIds((prev) => new Set([...prev, item.id]));
  };

  return (
    <>
      {viewing && <StatusViewer item={viewing} onClose={() => setViewing(null)} />}
      <div className="flex flex-col h-full bg-bg-light">
        <div className="flex items-center justify-between px-4 py-3 border-b border-bg-lighter">
          <h2 className="text-lg font-bold text-text">Updates</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted">
              <Search size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-lighter text-text-muted">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* My status */}
          <div className="flex items-center gap-3 px-4 py-3 hover:bg-bg-lighter/50 cursor-pointer border-b border-bg-lighter">
            <div className="relative">
              <Avatar name="Me" size="md" color="#2a3942" />
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-brand rounded-full flex items-center justify-center border-2 border-bg-light">
                <Plus size={11} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">My Status</p>
              <p className="text-xs text-text-muted">Tap to add status update</p>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg text-text-muted">
              <Edit3 size={16} />
            </button>
          </div>

          {/* Recent updates */}
          {unseen.length > 0 && (
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Recent updates</p>
            </div>
          )}
          {unseen.map((item) => (
            <StatusRow key={item.id} item={item} onView={handleView} seen={false} />
          ))}

          {/* Viewed updates */}
          {seen.length > 0 && (
            <div className="px-4 py-2 mt-1">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Viewed updates</p>
            </div>
          )}
          {seen.map((item) => (
            <StatusRow key={item.id} item={item} onView={handleView} seen />
          ))}
        </div>
      </div>
    </>
  );
}

function StatusRow({ item, onView, seen }: { item: StatusItem; onView: (i: StatusItem) => void; seen: boolean }) {
  return (
    <button onClick={() => onView(item)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-lighter/50 transition-colors text-left">
      <div className={`p-0.5 rounded-full ${seen ? 'border-2 border-text-muted/30' : 'border-2 border-brand'}`}>
        <Avatar name={item.name} color={item.avatarColor} size="md" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-text">{item.name}</p>
        <p className="text-xs text-text-muted">{item.time}</p>
      </div>
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-bg flex-shrink-0">
        {item.type === 'image' && item.imageUrl ? (
          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: item.bgColor }}>
            <span className="text-lg">✨</span>
          </div>
        )}
      </div>
    </button>
  );
}
