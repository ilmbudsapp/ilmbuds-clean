import React from 'react';
import { Icon, StarRating } from '@/components/ui/icons';

export type DifficultyLevel = {
  id: number;
  name: string;
  stars: number;
};

type DifficultySelectorProps = {
  levels: DifficultyLevel[];
  onSelectDifficulty: (level: DifficultyLevel) => void;
};

export function DifficultySelector({ levels, onSelectDifficulty }: DifficultySelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-center">Choose Your Level</h2>
      <div className="grid grid-cols-3 gap-3">
        {levels.map(level => (
          <button 
            key={level.id}
            className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center transition-transform active:scale-95 hover:shadow-lg"
            onClick={() => onSelectDifficulty(level)}
          >
            <Icon name="emoji_events" className="text-accent text-3xl mb-2" />
            <span className="font-medium">{level.name}</span>
            <div className="mt-1 flex">
              <StarRating rating={level.stars} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
