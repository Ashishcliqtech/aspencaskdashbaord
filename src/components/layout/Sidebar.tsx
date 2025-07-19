import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Mail, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../config/routes';
import { useRouter } from '../../hooks/useRouter';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const iconMap = {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  Settings,
};

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const { colors } = useTheme();
  const { currentPath, navigate } = useRouter();

  const mainRoutes = ROUTES.filter(route => !route.path.includes(':'));

  return (
    <div 
      className={`
        ${isCollapsed ? 'w-16' : 'w-64'} 
        bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700 
        transition-all duration-300 ease-in-out
        flex flex-col
        shadow-lg
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {mainRoutes.map((route) => {
            const IconComponent = iconMap[route.icon as keyof typeof iconMap];
            const isActive = currentPath === route.path;
            
            return (
              <li key={route.name}>
                <button
                  onClick={() => navigate(route.path)}
                  className={`
                    w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                  `}
                  title={isCollapsed ? route.title : undefined}
                >
                  {IconComponent && (
                    <IconComponent className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                  )}
                  {!isCollapsed && (
                    <span className="font-medium">{route.title}</span>
                  )}
                  {!isCollapsed && isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Admin Dashboard v1.0
          </div>
        </div>
      )}
    </div>
  );
};