/**
 * User and Authentication Types
 * Defines user roles, permissions, and profile information
 */

export type UserRole = 'owner' | 'admin' | 'viewer';

export type Permission =
  | 'view_transactions'
  | 'edit_transactions'
  | 'delete_transactions'
  | 'manage_categories'
  | 'manage_cards'
  | 'manage_users'
  | 'view_analytics'
  | 'export_data'
  | 'manage_settings'
  | 'view_audit_logs';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// Role-to-Permission Mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    'view_transactions',
    'edit_transactions',
    'delete_transactions',
    'manage_categories',
    'manage_cards',
    'manage_users',
    'view_analytics',
    'export_data',
    'manage_settings',
    'view_audit_logs',
  ],
  admin: [
    'view_transactions',
    'edit_transactions',
    'delete_transactions',
    'manage_categories',
    'manage_cards',
    'view_analytics',
    'export_data',
    'manage_settings',
    'view_audit_logs',
  ],
  viewer: ['view_transactions', 'view_analytics', 'export_data'],
};
