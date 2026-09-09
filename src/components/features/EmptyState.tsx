import React from 'react';
import { MessageSquare, Lock } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full chat-bg gap-6">
      <div className="flex flex-col items-center gap-4 max-w-xs text-center">
        <div className="w-24 h-24 rounded-full bg-brand/10 border-2 border-brand/20 flex items-center justify-center">
          <MessageSquare size={44} className="text-brand/60" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text mb-2">It's Me Web</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            Send and receive messages without keeping your phone online. Use It's Me on up to 4 linked devices.
          </p>
        </div>
        <div className="flex items-center gap-2 text-text-muted text-xs mt-2">
          <Lock size={13} />
          <span>Your personal messages are end-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
