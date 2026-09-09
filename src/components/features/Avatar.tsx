import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isGroup?: boolean;
  online?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-11 h-11 text-base',
  lg: 'w-14 h-14 text-xl',
  xl: 'w-20 h-20 text-3xl',
};

const dotSizeMap = {
  sm: 'w-2.5 h-2.5 border',
  md: 'w-3 h-3 border-2',
  lg: 'w-3.5 h-3.5 border-2',
  xl: 'w-4 h-4 border-2',
};

export default function Avatar({ name, color = '#2a3942', size = 'md', isGroup, online, className }: AvatarProps) {
  const initial = isGroup ? '👥' : name.charAt(0).toUpperCase();
  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div
        className={cn('rounded-full flex items-center justify-center font-semibold text-white select-none', sizeMap[size])}
        style={{ backgroundColor: color }}
      >
        {isGroup ? <span className="text-base leading-none">{initial}</span> : <span>{initial}</span>}
      </div>
      {online && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full bg-brand border-bg',
            dotSizeMap[size]
          )}
        />
      )}
    </div>
  );
}
