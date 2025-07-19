// Application configuration
export const APP_CONFIG = {
  name: 'Premium Admin Dashboard',
  version: '1.0.0',
  description: 'Advanced admin dashboard for business management',
  author: 'Admin Team',
  
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    retryAttempts: 3,
  },
  
  // Theme Configuration
  theme: {
    defaultMode: 'light' as const,
    storageKey: 'admin-theme-mode',
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
  },
  
  // File Upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  },
  
  // Features
  features: {
    darkMode: true,
    notifications: true,
    analytics: true,
    export: true,
  },
} as const;

// Environment variables with defaults
export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
} as const;