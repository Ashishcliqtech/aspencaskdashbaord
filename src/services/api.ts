import { 
  ApiResponse, 
  DashboardStats, 
  JobPosition, 
  Application, 
  ContactMessage, 
  NewsletterSubscriber 
} from '../types';
import { APP_CONFIG } from '../config/app';
import { PathUtils } from '../utils/paths';

class ApiService {
  private baseUrl = '/api';
  private timeout = APP_CONFIG.api.timeout;
  private retryAttempts = APP_CONFIG.api.retryAttempts;

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {},
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // Retry logic
      if (retryCount < this.retryAttempts && error instanceof Error) {
        console.log(`Retrying request (${retryCount + 1}/${this.retryAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return this.request(endpoint, options, retryCount + 1);
      }
      
      throw error;
    }
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    // Mock data for now - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalApplications: 156,
            totalJobs: 12,
            totalContacts: 89,
            totalSubscribers: 1247,
            applicationsTrend: 12.5,
            jobsTrend: -2.3,
            contactsTrend: 8.7,
            subscribersTrend: 15.2,
          }
        });
      }, 1000);
    });
  }

  // Job Positions
  async getJobPositions(): Promise<ApiResponse<JobPosition[]>> {
    return this.request<JobPosition[]>('/get-jobs');
  }

  async createJobPosition(job: Omit<JobPosition, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<JobPosition>> {
    return this.request<JobPosition>('/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    });
  }

  async updateJobPosition(id: string, job: Partial<JobPosition>): Promise<ApiResponse<JobPosition>> {
    return this.request<JobPosition>(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(job),
    });
  }

  async deleteJobPosition(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  // Applications
  async getApplications(): Promise<ApiResponse<Application[]>> {
    return this.request<Application[]>('/applications');
  }

  async updateApplicationStatus(id: string, status: Application['status']): Promise<ApiResponse<Application>> {
    return this.request<Application>(`/applications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Contact Messages
  async getContactMessages(): Promise<ApiResponse<ContactMessage[]>> {
    // Mock data for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: '1',
              name: 'Alice Johnson',
              email: 'alice@example.com',
              subject: 'Partnership Inquiry',
              message: 'I would like to discuss a potential partnership...',
              status: 'unread',
              priority: 'high',
              createdAt: '2024-01-15T09:15:00Z',
            },
            {
              id: '2',
              name: 'Bob Wilson',
              email: 'bob@example.com',
              subject: 'General Question',
              message: 'I have a question about your services...',
              status: 'read',
              priority: 'medium',
              createdAt: '2024-01-14T16:45:00Z',
            },
          ] as ContactMessage[]
        });
      }, 600);
    });
  }

  async updateContactStatus(id: string, status: ContactMessage['status']): Promise<ApiResponse<ContactMessage>> {
    return this.request<ContactMessage>(`/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Newsletter Subscribers
  async getNewsletterSubscribers(): Promise<ApiResponse<NewsletterSubscriber[]>> {
    // Mock data for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: '1',
              email: 'subscriber1@example.com',
              status: 'active',
              subscribedAt: '2024-01-10T12:00:00Z',
              source: 'website',
              tags: ['newsletter', 'updates'],
            },
            {
              id: '2',
              email: 'subscriber2@example.com',
              status: 'active',
              subscribedAt: '2024-01-09T15:30:00Z',
              source: 'social_media',
              tags: ['newsletter'],
            },
          ] as NewsletterSubscriber[]
        });
      }, 700);
    });
  }
}

export const apiService = new ApiService();