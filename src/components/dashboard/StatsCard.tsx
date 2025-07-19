import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const colorClasses = {
  primary: {
    bg: 'bg-primary-500',
    text: 'text-primary-600 dark:text-primary-400',
    lightBg: 'bg-primary-50 dark:bg-primary-900/20',
  },
  success: {
    bg: 'bg-green-500',
    text: 'text-green-600 dark:text-green-400',
    lightBg: 'bg-green-50 dark:bg-green-900/20',
  },
  warning: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-600 dark:text-yellow-400',
    lightBg: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  error: {
    bg: 'bg-red-500',
    text: 'text-red-600 dark:text-red-400',
    lightBg: 'bg-red-50 dark:bg-red-900/20',
  },
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color = 'primary',
}) => {
  const colors = colorClasses[color];
  const isPositiveTrend = trend && trend > 0;
  const isNegativeTrend = trend && trend < 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              {isPositiveTrend && (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              )}
              {isNegativeTrend && (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositiveTrend
                    ? 'text-green-600 dark:text-green-400'
                    : isNegativeTrend
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              {trendLabel && (
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={`${colors.lightBg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
};