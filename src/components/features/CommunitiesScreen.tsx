import React from 'react';
import { Plus, Users } from 'lucide-react';

const communities = [
  { id: '1', name: 'University Alumni 🎓', desc: 'Stay connected with your batchmates', members: 150, groups: 5, color: '#8e44ad' },
  { id: '2', name: 'Neighborhood 🏘️', desc: 'Local community announcements and events', members: 85, groups: 3, color: '#2980b9' },
  { id: '3', name: 'Sports Club ⚽', desc: 'Matches, events, and team updates', members: 45, groups: 2, color: '#e67e22' },
];

export default function CommunitiesScreen() {
  return (
    <div className="flex flex-col h-full bg-bg-light">
      <div className="px-4 py-3 border-b border-bg-lighter">
        <h2 className="text-lg font-bold text-text">Communities</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Create new */}
        <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-bg-lighter/50 border-b border-bg-lighter transition-colors">
          <div className="w-11 h-11 rounded-full bg-brand/20 flex items-center justify-center">
            <Plus size={22} className="text-brand" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-text">New community</p>
            <p className="text-xs text-text-muted">Create a community with groups</p>
          </div>
        </button>

        {/* Communities */}
        {communities.map((c) => (
          <button
            key={c.id}
            className="w-full flex items-start gap-3 px-4 py-4 hover:bg-bg-lighter/50 border-b border-bg-lighter transition-colors text-left"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: c.color + '33', border: `2px solid ${c.color}33` }}
            >
              🏛️
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text mb-0.5">{c.name}</p>
              <p className="text-xs text-text-muted mb-1.5 line-clamp-1">{c.desc}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <Users size={12} />
                  <span>{c.members} members</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <span>·</span>
                  <span>{c.groups} groups</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
