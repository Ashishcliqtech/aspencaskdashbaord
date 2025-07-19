import React from 'react';
import { Bell, Search, Sun, Moon, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from '../../hooks/useRouter';
import { generateBreadcrumbs } from '../../utils/paths';
import { Breadcrumbs } from '../ui/Breadcrumbs';

export const Header: React.FC = () => {
  const { mode, toggleMode } = useTheme();
  const { currentPath, currentRoute, routes } = useRouter();
  
  const breadcrumbs = generateBreadcrumbs(currentPath, routes);
  const title = currentRoute?.title || 'Dashboard';

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 space-y-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          {currentRoute?.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {currentRoute.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                Admin User
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      {breadcrumbs.length > 1 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
    </header>
  );
};