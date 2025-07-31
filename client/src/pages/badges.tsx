import React from 'react';
import { useUserContext } from '@/context/user-context';
import { ProfileBadge } from '@/components/profile-badge';
import { Icon } from '@/components/ui/icons';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';

export default function Badges() {
  const { user } = useUserContext();
  
  // Define available badges
  const availableBadges = [
    { id: 'islamic_stories_master', name: 'Islamic Stories Master', icon: 'menu_book', color: 'text-primary', earned: false },
    { id: 'five_pillars_master', name: 'Five Pillars Master', icon: 'mosque', color: 'text-secondary', earned: false },
    { id: 'prophets_master', name: 'Prophets Master', icon: 'people', color: 'text-accent', earned: false },
    { id: 'quran_master', name: 'Quran Master', icon: 'auto_stories', color: 'text-purple-600', earned: false },
    { id: 'perfect_score', name: 'Perfect Score', icon: 'star', color: 'text-yellow-500', earned: false },
    { id: 'fast_learner', name: 'Fast Learner', icon: 'speed', color: 'text-emerald-600', earned: false }
  ];
  
  // Mark badges as earned if they're in the user's badgesEarned array
  if (user && user.badgesEarned) {
    for (const badge of availableBadges) {
      if (user.badgesEarned.includes(badge.name)) {
        badge.earned = true;
      }
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="emoji_events" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">Your Badges</h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto px-4 py-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold mb-2">Your Achievements</h2>
          <p className="text-sm text-gray-600">
            Complete quizzes to earn special badges!
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {availableBadges.map(badge => (
            <Card key={badge.id} className={`p-4 ${badge.earned ? 'bg-white' : 'bg-gray-100'}`}>
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${badge.earned ? badge.color + '/10' : 'bg-gray-200'}`}>
                  <Icon 
                    name={badge.icon} 
                    className={`text-3xl ${badge.earned ? badge.color : 'text-gray-400'}`}
                  />
                </div>
                <h3 className="font-bold text-center">{badge.name}</h3>
                <div className="mt-2 text-xs">
                  {badge.earned ? (
                    <span className="text-secondary flex items-center">
                      <Icon name="check_circle" className="text-secondary mr-1 text-xs" />
                      Earned
                    </span>
                  ) : (
                    <span className="text-gray-500">Not yet earned</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Navbar />
    </div>
  );
}
