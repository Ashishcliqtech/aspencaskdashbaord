// Path utilities for consistent URL handling
export class PathUtils {
  private static baseUrl = import.meta.env.VITE_APP_URL || '';

  // API paths
  static api = {
    base: '/api',
    jobs: '/api/get-jobs',
    applications: '/applications',
    contacts: '/api/contact',
    newsletter: '/api/news',
    apply: '/api/apply',
  } as const;

  // Public asset paths
  static assets = {
    images: '/images',
    icons: '/icons',
    documents: '/documents',
    uploads: '/uploads',
  } as const;

  // Route paths
  static routes = {
    home: '/',
    dashboard: '/',
    jobs: '/jobs',
    jobCreate: '/jobs/create',
    jobDetail: (id: string) => `/jobs/${id}`,
    jobEdit: (id: string) => `/jobs/${id}/edit`,
    applications: '/applications',
    applicationDetail: (id: string) => `/applications/${id}`,
    contacts: '/contacts',
    newsletter: '/newsletter',
    settings: '/settings',
  } as const;

  // Get full URL
  static getFullUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  // Get API URL
  static getApiUrl(endpoint: string): string {
    return `${this.api.base}${endpoint}`;
  }

  // Get asset URL
  static getAssetUrl(path: string): string {
    return `${this.assets.images}${path}`;
  }

  // Join paths safely
  static join(...paths: string[]): string {
    return paths
      .map(path => path.replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/');
  }

  // Check if path is external
  static isExternal(path: string): boolean {
    return /^https?:\/\//.test(path);
  }

  // Get relative path
  static getRelativePath(from: string, to: string): string {
    const fromParts = from.split('/').filter(Boolean);
    const toParts = to.split('/').filter(Boolean);
    
    let commonLength = 0;
    for (let i = 0; i < Math.min(fromParts.length, toParts.length); i++) {
      if (fromParts[i] === toParts[i]) {
        commonLength++;
      } else {
        break;
      }
    }
    
    const upLevels = fromParts.length - commonLength;
    const downPath = toParts.slice(commonLength);
    
    return '../'.repeat(upLevels) + downPath.join('/');
  }

  // Parse query parameters
  static parseQuery(search: string): Record<string, string> {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};
    
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    
    return result;
  }

  // Build query string
  static buildQuery(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, String(value));
      }
    });
    
    const query = searchParams.toString();
    return query ? `?${query}` : '';
  }
}

// Route parameter utilities
export const getRouteParams = (
  pattern: string,
  path: string
): Record<string, string> => {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');
  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];

    if (patternPart?.startsWith(':')) {
      const paramName = patternPart.slice(1);
      if (pathPart) {
        params[paramName] = decodeURIComponent(pathPart);
      }
    }
  }

  return params;
};

// Breadcrumb utilities
export interface Breadcrumb {
  label: string;
  path: string;
  isActive?: boolean;
}

export const generateBreadcrumbs = (
  currentPath: string,
  routes: any[]
): Breadcrumb[] => {
  const breadcrumbs: Breadcrumb[] = [];
  const pathParts = currentPath.split('/').filter(Boolean);
  
  let currentRoute = '';
  
  for (let i = 0; i < pathParts.length; i++) {
    currentRoute += `/${pathParts[i]}`;
    
    const route = routes.find(r => r.path === currentRoute);
    if (route) {
      breadcrumbs.push({
        label: route.title,
        path: currentRoute,
        isActive: i === pathParts.length - 1,
      });
    }
  }
  
  return breadcrumbs;
};