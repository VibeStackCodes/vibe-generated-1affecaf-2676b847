/**
 * Authentication Hook
 * Manages user authentication and authorization
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, ROLE_PERMISSIONS } from '@/types/user';
import { generateId } from '@/utils/idGenerator';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with a mock user for development
  const [user, setUser] = useState<User | null>({
    id: generateId('usr'),
    email: 'demo@spendsight.com',
    name: 'Demo User',
    role: 'owner',
    permissions: ROLE_PERMISSIONS.owner,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission as any);
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  const login = async (email: string, password: string): Promise<void> => {
    // Mock login - in production, this would call backend API
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({
          id: generateId('usr'),
          email,
          name: email.split('@')[0],
          role: 'owner',
          permissions: ROLE_PERMISSIONS.owner,
          isActive: true,
          lastLoginAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    hasPermission,
    hasRole,
    login,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
