import React, { useState, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { PageLoadingSpinner } from './components/ui/LoadingSpinner';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { useRouter } from './hooks/useRouter';

// Lazy load components for better performance
const DashboardOverview = React.lazy(() => import('./components/dashboard/DashboardOverview').then(module => ({ default: module.DashboardOverview })));
const JobsManagement = React.lazy(() => import('./components/jobs/JobsManagement').then(module => ({ default: module.JobsManagement })));
const ApplicationsManagement = React.lazy(() => import('./components/applications/ApplicationsManagement').then(module => ({ default: module.ApplicationsManagement })));

function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentPath } = useRouter();

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <DashboardOverview />;
      case '/jobs':
        return <JobsManagement />;
      case '/applications':
        return <ApplicationsManagement />;
      case '/contacts':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Contact Messages
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Contact messages management coming soon...
            </p>
          </div>
        );
      case '/newsletter':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Newsletter Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Newsletter management coming soon...
            </p>
          </div>
        );
      case '/settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Settings panel coming soon...
            </p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <ErrorBoundary>
            <Suspense fallback={<PageLoadingSpinner />}>
              {renderContent()}
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AdminDashboard />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;