/**
 * Sidebar Navigation Component
 * Displays navigation menu items
 */

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onToggle?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
  requiredRole?: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Transactions', path: '/transactions', icon: '💳' },
  { label: 'Quick Add', path: '/quick-add', icon: '➕' },
  { label: 'Categories', path: '/categories', icon: '🏷️' },
  { label: 'Import', path: '/import', icon: '📥' },
  { label: 'Templates', path: '/templates', icon: '📋' },
  { label: 'Audit Log', path: '/audit-log', icon: '📝', requiredRole: ['owner', 'admin'] },
  { label: 'Users', path: '/users', icon: '👥', requiredRole: ['owner', 'admin'] },
];

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const canAccess = (item: NavItem) => {
    if (!item.requiredRole) return true;
    return item.requiredRole.includes(user?.role || '');
  };

  const filteredItems = NAV_ITEMS.filter(canAccess);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 transition-transform md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Menu
            </h2>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-2">
              {filteredItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#003d82] text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      if (window.innerWidth < 768) onToggle?.();
                    }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>SpendSight v1.0</p>
              <p>© 2024</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
