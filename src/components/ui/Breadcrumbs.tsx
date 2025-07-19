import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Breadcrumb } from '../../utils/paths';

interface BreadcrumbsProps {
  items: Breadcrumb[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
  className = '',
}) => {
  const allItems = showHome
    ? [{ label: 'Home', path: '/', isActive: false }, ...items]
    : items;

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`}>
      {allItems.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
          )}
          
          <div className="flex items-center">
            {index === 0 && showHome && (
              <Home className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
            )}
            
            {item.isActive ? (
              <span className="text-gray-900 dark:text-white font-medium">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => {
                  // Handle navigation - you can integrate with your router here
                  window.history.pushState({}, '', item.path);
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </button>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};