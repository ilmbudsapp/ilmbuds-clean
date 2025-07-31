import React from 'react';
import { useUserContext } from '@/context/user-context';
import { ProfileBadge } from '@/components/profile-badge';
import { Icon } from '@/components/ui/icons';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';

export default function Profile() {
  const { user, logout } = useUserContext();
  
  // Fetch user progress to show stats
  const { data: userProgress = [] } = useQuery({
    queryKey: user ? [`/api/users/${user.id}/progress`] : [],
    enabled: !!user,
  });
  
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-indigo-50">
        <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center">
            <Icon name="person" className="text-3xl mr-2" />
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-4 py-6 flex items-center justify-center">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Please Login</h2>
            <p className="mb-6 text-gray-600">You need to login to view your profile</p>
          </Card>
        </main>
        
        <Navbar />
      </div>
    );
  }
  
  // Calculate stats
  const completedQuizzes = user.quizzesCompleted;
  const totalPoints = user.points;
  const earnedBadges = user.badgesEarned?.length || 0;
  
  // Calculate average score
  let averageScore = 0;
  if (userProgress.length > 0) {
    const scoreSum = userProgress.reduce((sum, quiz) => sum + quiz.score, 0);
    averageScore = Math.round(scoreSum / userProgress.length);
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="person" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">Profile</h1>
        </div>
        <ProfileBadge points={totalPoints} />
      </header>

      <main className="flex-1 overflow-auto px-4 py-6">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="person" className="text-primary text-5xl" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-center mb-6">{user.username}</h2>
        
        <Card className="p-4 mb-6">
          <h3 className="font-bold mb-3">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 p-3 rounded-lg flex items-center">
              <Icon name="emoji_events" className="text-primary mr-2" />
              <div>
                <div className="font-bold">{totalPoints}</div>
                <div className="text-xs text-gray-600">Total Points</div>
              </div>
            </div>
            <div className="bg-secondary/10 p-3 rounded-lg flex items-center">
              <Icon name="school" className="text-secondary mr-2" />
              <div>
                <div className="font-bold">{completedQuizzes}</div>
                <div className="text-xs text-gray-600">Quizzes Completed</div>
              </div>
            </div>
            <div className="bg-accent/10 p-3 rounded-lg flex items-center">
              <Icon name="stars" className="text-accent mr-2" />
              <div>
                <div className="font-bold">{earnedBadges}</div>
                <div className="text-xs text-gray-600">Badges Earned</div>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg flex items-center">
              <Icon name="leaderboard" className="text-purple-600 mr-2" />
              <div>
                <div className="font-bold">{averageScore}%</div>
                <div className="text-xs text-gray-600">Average Score</div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 mb-6">
          <h3 className="font-bold mb-1">Recent Quizzes</h3>
          {userProgress.length > 0 ? (
            <div className="space-y-2 mt-3">
              {userProgress.slice(0, 3).map((progress) => (
                <div key={progress.id} className="flex justify-between items-center p-2 border-b">
                  <div className="flex items-center">
                    <Icon name="assignment" className="text-gray-400 mr-2" />
                    <span>Quiz #{progress.quizId}</span>
                  </div>
                  <div className="font-bold text-right">
                    {progress.score}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No quizzes completed yet</p>
          )}
        </Card>
        
        {user.role === 'parent' && (
          <Link href="/parent-dashboard">
            <Button
              variant="secondary"
              className="w-full mb-4"
            >
              <Icon name="dashboard" className="mr-2" />
              Parent Dashboard
            </Button>
          </Link>
        )}
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={logout}
        >
          <Icon name="logout" className="mr-2" />
          Log Out
        </Button>
      </main>

      <Navbar />
    </div>
  );
}
