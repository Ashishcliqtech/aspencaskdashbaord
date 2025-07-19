// Core types for the admin dashboard
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  status: 'open' | 'closed' | 'draft';
  applications: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  requirements: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  phone?: string;
  resume?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
  repliedAt?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
  source: string;
  tags?: string[];
}

export interface DashboardStats {
  totalApplications: number;
  totalJobs: number;
  totalContacts: number;
  totalSubscribers: number;
  applicationsTrend: number;
  jobsTrend: number;
  contactsTrend: number;
  subscribersTrend: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface SearchFilters {
  query?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  department?: string;
  type?: string;
}