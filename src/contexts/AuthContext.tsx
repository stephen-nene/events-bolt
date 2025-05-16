import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
}

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Event Creator',
    email: 'creator@example.com',
    role: 'creator',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS.find((u) => u.email === email);
      
      if (mockUser && password === 'password123') {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        name,
        email,
        role: 'user',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};