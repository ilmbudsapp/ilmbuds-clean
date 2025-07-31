import React from 'react';
import { Icon } from '@/components/ui/icons';

type ProfileBadgeProps = {
  points: number;
};

export function ProfileBadge({ points }: ProfileBadgeProps) {
  return (
    <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-white/25 transition-all hover:bg-white/30">
      <div className="relative">
        <Icon 
          name="stars" 
          className="text-amber-300 mr-2" 
        />
        <span className="absolute top-0 left-0 right-0 bottom-0 bg-amber-300/30 rounded-full filter blur-sm scale-150 animate-pulse-slow"></span>
      </div>
      <span className="font-semibold text-white tracking-wide">{points.toLocaleString()}</span>
    </div>
  );
}
