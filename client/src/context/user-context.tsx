import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { User } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface UserContextProps {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { toast } = useToast();
  const [userId, setUserId] = useState<number | null>(() => {
    // Check local storage for saved user ID
    const savedUserId = localStorage.getItem('userId');
    return savedUserId ? parseInt(savedUserId) : null;
  });

  // Fetch user data if we have a userId
  const { data: user, isLoading: isUserLoading } = useQuery<User>({
    queryKey: userId ? [`/api/users/${userId}`] : [],
    enabled: !!userId,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest('POST', '/api/users/login', credentials);
      return response.json();
    },
    onSuccess: (data) => {
      setUserId(data.id);
      localStorage.setItem('userId', data.id.toString());
      toast({
        title: "Success",
        description: "You are now logged in",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to log in. Please check your credentials.",
        variant: "destructive",
      });
      console.error("Login failed:", error);
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: { username: string; password: string; role?: string }) => {
      const response = await apiRequest('POST', '/api/users/register', userData);
      return response.json();
    },
    onSuccess: (data) => {
      setUserId(data.id);
      localStorage.setItem('userId', data.id.toString());
      toast({
        title: "Success",
        description: "Account created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create account. Username may already exist.",
        variant: "destructive",
      });
      console.error("Registration failed:", error);
    }
  });

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const register = async (username: string, password: string, role?: string) => {
    await registerMutation.mutateAsync({ username, password, role });
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
    queryClient.clear();
    toast({
      title: "Logged out",
      description: "You have been logged out",
    });
  };

  const isLoggedIn = !!user;
  const isLoading = isUserLoading || loginMutation.isPending || registerMutation.isPending;

  const value: UserContextProps = {
    user: (user as User) || null,
    isLoading,
    isLoggedIn,
    login,
    register,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}