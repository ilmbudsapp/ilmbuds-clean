import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'wouter';
import { User, UserProgress } from '@shared/schema';
import { useUserContext } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@/components/ui/icons';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Types for progress summary data
type ChildProgressSummary = {
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  totalPoints: number;
  recentActivity: UserProgress[];
};

type ProgressSummaryMap = Record<number, ChildProgressSummary>;

export default function ParentDashboard() {
  const { user } = useUserContext();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  // Redirect if not logged in or not a parent
  useEffect(() => {
    if (!user) {
      setLocation('/');
    } else if (user.role !== 'parent') {
      setLocation('/');
    }
  }, [user, setLocation]);

  // Fetch children
  const { data: children = [] } = useQuery<Omit<User, 'password'>[]>({
    queryKey: ['/api/parents', user?.id, 'children'],
    queryFn: async () => {
      if (!user) return [];
      const res = await fetch(`/api/parents/${user.id}/children`);
      if (!res.ok) throw new Error('Failed to fetch children');
      return res.json();
    },
    enabled: !!user && user.role === 'parent',
  });

  // Fetch children progress
  const { data: progressData = {} } = useQuery<ProgressSummaryMap>({
    queryKey: ['/api/parents', user?.id, 'children', 'progress'],
    queryFn: async () => {
      if (!user) return {};
      const res = await fetch(`/api/parents/${user.id}/children/progress`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      return res.json();
    },
    enabled: !!user && user.role === 'parent',
  });

  // Set first child as selected if none selected
  useEffect(() => {
    if (children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].id);
    }
  }, [children, selectedChildId]);

  // If no user or not a parent, show loading
  if (!user || user.role !== 'parent') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Extract selected child's data
  const selectedChild = children.find(child => child.id === selectedChildId);
  const selectedChildProgress = selectedChildId ? progressData[selectedChildId] : undefined;

  // Prepare data for charts
  const prepareChartData = () => {
    const chartData = children.map(child => {
      const progress = progressData[child.id] || {
        totalQuizzes: 0,
        completedQuizzes: 0,
        averageScore: 0,
        totalPoints: 0
      };
      
      return {
        name: child.displayName || child.username,
        points: progress.totalPoints,
        completed: progress.completedQuizzes,
        score: progress.averageScore,
      };
    });
    
    return chartData;
  };

  const chartData = prepareChartData();

  // Format date for activity timeline
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-indigo-50 p-4">
      <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md rounded-lg mb-6">
        <div className="flex items-center">
          <Icon name="dashboard" className="text-3xl mr-2" />
          <h1 className="text-xl font-bold">Parent Dashboard</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-2">{user.displayName || user.username}</span>
          <Button 
            variant="outline" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => setLocation('/')}
          >
            <Icon name="home" className="mr-1" />
            Home
          </Button>
        </div>
      </header>

      <div className="block lg:hidden mb-4">
        <Card className="bg-white p-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {children.length === 0 ? (
              <p className="text-gray-500 p-2">No children linked yet</p>
            ) : (
              children.map(child => (
                <Button
                  key={child.id}
                  variant={selectedChildId === child.id ? "default" : "outline"}
                  className="flex items-center"
                  onClick={() => setSelectedChildId(child.id)}
                >
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={child.profileImageUrl || undefined} />
                    <AvatarFallback>{child.displayName?.[0] || child.username[0]}</AvatarFallback>
                  </Avatar>
                  <span>{child.displayName || child.username}</span>
                </Button>
              ))
            )}
            <Button 
              size="sm"
              variant="ghost"
              className="text-primary"
              onClick={() => {
                alert('This feature would allow you to add a child to your account. In a production app, you would see a form here.');
              }}
            >
              <Icon name="person_add" className="mr-1" />
              Add
            </Button>
          </div>
        </Card>
      </div>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - only visible on larger screens */}
        <div className="hidden lg:block col-span-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Children</h2>
          <div className="space-y-2">
            {children.length === 0 ? (
              <p className="text-gray-500">No children linked yet</p>
            ) : (
              children.map(child => (
                <Button
                  key={child.id}
                  variant={selectedChildId === child.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedChildId(child.id)}
                >
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={child.profileImageUrl || undefined} />
                    <AvatarFallback>{child.displayName?.[0] || child.username[0]}</AvatarFallback>
                  </Avatar>
                  <span>{child.displayName || child.username}</span>
                </Button>
              ))
            )}
          </div>
          
          <div className="mt-6">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => {
                // This would open a modal for adding a child in a real app
                alert('This feature would allow you to add a child to your account. In a production app, you would see a form here.');
              }}
            >
              <Icon name="person_add" className="mr-1" />
              Add Child
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-3 bg-white rounded-lg shadow-md p-4">
          {children.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Icon name="people" className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">No Children Linked</h3>
              <p className="text-gray-500 mb-4 text-center">
                You haven't linked any children to your account yet. 
                Add a child to start tracking their learning progress.
              </p>
              <Button>
                <Icon name="person_add" className="mr-1" />
                Add Your First Child
              </Button>
            </div>
          ) : selectedChild ? (
            <Tabs 
              defaultValue="overview" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="activities">Recent Activities</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-2">
                          <AvatarImage src={selectedChild.profileImageUrl || undefined} />
                          <AvatarFallback>{selectedChild.displayName?.[0] || selectedChild.username[0]}</AvatarFallback>
                        </Avatar>
                        {selectedChild.displayName || selectedChild.username}'s Overview
                      </div>
                    </CardTitle>
                    <CardDescription>
                      View your child's overall learning progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-blue-500 text-sm font-medium">Total Points</div>
                        <div className="text-2xl font-bold">{selectedChildProgress?.totalPoints || 0}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-green-500 text-sm font-medium">Quizzes Completed</div>
                        <div className="text-2xl font-bold">{selectedChildProgress?.completedQuizzes || 0} / {selectedChildProgress?.totalQuizzes || 0}</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-purple-500 text-sm font-medium">Average Score</div>
                        <div className="text-2xl font-bold">{selectedChildProgress?.averageScore ? `${Math.round(selectedChildProgress.averageScore)}%` : 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div className="h-60">
                      <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[{
                            name: 'Progress',
                            completed: selectedChildProgress?.completedQuizzes || 0,
                            remaining: (selectedChildProgress?.totalQuizzes || 0) - (selectedChildProgress?.completedQuizzes || 0)
                          }]}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completed" name="Completed Quizzes" stackId="a" fill="#8884d8" />
                          <Bar dataKey="remaining" name="Remaining Quizzes" stackId="a" fill="#ffc658" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => setActiveTab('progress')}>
                      View Detailed Progress
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="progress" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress Details</CardTitle>
                    <CardDescription>
                      Detailed view of {selectedChild.displayName || selectedChild.username}'s learning progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="score" name="Average Score (%)" fill="#8884d8" />
                          <Bar dataKey="completed" name="Quizzes Completed" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Badges Earned</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedChild.badgesEarned && selectedChild.badgesEarned.length > 0 ? (
                          selectedChild.badgesEarned.map((badge, index) => (
                            <div key={index} className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full flex items-center">
                              <Icon name="emoji_events" className="mr-1 text-yellow-500" />
                              {badge}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No badges earned yet</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>
                      Track {selectedChild.displayName || selectedChild.username}'s recent learning activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedChildProgress?.recentActivity && selectedChildProgress.recentActivity.length > 0 ? (
                        selectedChildProgress.recentActivity.map((activity, index) => (
                          <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">Quiz #{activity.quizId}</div>
                                <div className="text-sm text-gray-500">
                                  Score: {activity.score}%, 
                                  {activity.correctAnswers} correct, 
                                  {activity.incorrectAnswers} incorrect
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatDate(activity.lastCompleted)}
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    activity.score >= 80 ? 'bg-green-600' : 
                                    activity.score >= 60 ? 'bg-yellow-400' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${activity.score}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Icon name="history" className="text-4xl text-gray-300 mb-2" />
                          <p className="text-gray-500">No recent activities</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Child Account Settings</CardTitle>
                    <CardDescription>
                      Manage {selectedChild.displayName || selectedChild.username}'s account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Profile Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Username</div>
                            <div>{selectedChild.username}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Display Name</div>
                            <div>{selectedChild.displayName || 'Not set'}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="text-lg font-medium mb-2">Account Actions</h3>
                        <div className="space-y-2">
                          <Button variant="outline">
                            <Icon name="edit" className="mr-1" />
                            Edit Profile
                          </Button>
                          <Button variant="outline" className="ml-2">
                            <Icon name="password" className="mr-1" />
                            Reset Password
                          </Button>
                          <Button variant="outline" className="ml-2 text-red-500 hover:bg-red-50 border-red-200">
                            <Icon name="delete" className="mr-1" />
                            Unlink Child
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p>Select a child to view their progress</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}