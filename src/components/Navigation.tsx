/**
 * Top Navigation Component
 * Displays header with menu toggle, branding, and user controls
 */

import { useAuth } from '@/hooks/useAuth';

interface NavigationProps {
  onMenuClick?: () => void;
}

export const Navigation = ({ onMenuClick }: NavigationProps) => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Left Section: Menu Toggle & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#003d82] flex items-center justify-center">
              <span className="text-lg font-bold text-white">$</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">SpendSight</h1>
          </div>
        </div>

        {/* Right Section: User Info & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
          </div>

          <button
            onClick={logout}
            className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
