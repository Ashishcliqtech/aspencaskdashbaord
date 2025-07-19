import React from 'react';
import { Briefcase, Users, MessageSquare, Mail } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { StatCardSkeleton } from '../ui/Skeleton';
import { ErrorMessage } from '../ui/ErrorBoundary';
import { useApi } from '../../hooks/useApi';
import { apiService } from '../../services/api';

export const DashboardOverview: React.FC = () => {
  const { data: stats, loading, error, retry } = useApi(
    () => apiService.getDashboardStats(),
    {
      immediate: true,
    }
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load dashboard stats"
        message={error}
        onRetry={retry}
        className="mb-6"
      />
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={Users}
          trend={stats.applicationsTrend}
          trendLabel="this month"
          color="primary"
        />
        
        <StatsCard
          title="Active Jobs"
          value={stats.totalJobs}
          icon={Briefcase}
          trend={stats.jobsTrend}
          trendLabel="this month"
          color="success"
        />
        
        <StatsCard
          title="Contact Messages"
          value={stats.totalContacts}
          icon={MessageSquare}
          trend={stats.contactsTrend}
          trendLabel="this month"
          color="warning"
        />
        
        <StatsCard
          title="Newsletter Subscribers"
          value={stats.totalSubscribers}
          icon={Mail}
          trend={stats.subscribersTrend}
          trendLabel="this month"
          color="error"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Applications
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Frontend Developer</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Messages
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Alice Johnson</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Partnership Inquiry</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-full">
                  Unread
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};