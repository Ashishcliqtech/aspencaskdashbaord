import React from 'react';
import { Eye, Download, Mail, Phone, Calendar } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { apiService } from '../../services/api';
import { TableSkeleton } from '../ui/Skeleton';
import { ErrorMessage } from '../ui/ErrorBoundary';
import { Application } from '../../types';

const statusColors = {
  pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200',
  reviewing: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200',
  interviewed: 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200',
  accepted: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200',
  rejected: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200',
};

export const ApplicationsList: React.FC = () => {
  const { data: applications, loading, error, retry } = useApi(
    () => apiService.getApplications(),
    {
      immediate: true,
    }
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <TableSkeleton rows={5} columns={5} />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load applications"
        message={error}
        onRetry={retry}
      />
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
        <div className="w-12 h-12 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No applications found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Applications will appear here when candidates apply for your jobs.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {application.applicantName}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Mail className="w-3 h-3 mr-1" />
                      {application.applicantEmail}
                    </div>
                    {application.phone && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Phone className="w-3 h-3 mr-1" />
                        {application.phone}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 dark:text-white">
                    {application.jobTitle}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900 dark:text-white">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {formatDate(application.submittedAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[application.status]}`}>
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                      title="View application"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {application.resume && (
                      <button
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                        title="Download resume"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                      title="Contact candidate"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};