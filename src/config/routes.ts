// Route configuration
export interface RouteConfig {
  path: string;
  name: string;
  title: string;
  description?: string;
  icon?: string;
  component: string;
  children?: RouteConfig[];
  meta?: {
    requiresAuth?: boolean;
    roles?: string[];
    layout?: string;
  };
}

export const ROUTES: RouteConfig[] = [
  {
    path: '/',
    name: 'dashboard',
    title: 'Dashboard',
    description: 'Overview of your business metrics',
    icon: 'LayoutDashboard',
    component: 'DashboardOverview',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/jobs',
    name: 'jobs',
    title: 'Job Management',
    description: 'Manage job postings and track applications',
    icon: 'Briefcase',
    component: 'JobsManagement',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/jobs/create',
        name: 'jobs-create',
        title: 'Create Job',
        component: 'JobCreate',
        meta: { requiresAuth: true },
      },
      {
        path: '/jobs/:id',
        name: 'jobs-detail',
        title: 'Job Details',
        component: 'JobDetail',
        meta: { requiresAuth: true },
      },
      {
        path: '/jobs/:id/edit',
        name: 'jobs-edit',
        title: 'Edit Job',
        component: 'JobEdit',
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/applications',
    name: 'applications',
    title: 'Applications',
    description: 'Review and manage job applications',
    icon: 'Users',
    component: 'ApplicationsManagement',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/applications/:id',
        name: 'applications-detail',
        title: 'Application Details',
        component: 'ApplicationDetail',
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/contacts',
    name: 'contacts',
    title: 'Contact Messages',
    description: 'Manage customer inquiries and messages',
    icon: 'MessageSquare',
    component: 'ContactsManagement',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/newsletter',
    name: 'newsletter',
    title: 'Newsletter',
    description: 'Manage newsletter subscribers and campaigns',
    icon: 'Mail',
    component: 'NewsletterManagement',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    title: 'Settings',
    description: 'Configure application settings',
    icon: 'Settings',
    component: 'SettingsManagement',
    meta: {
      requiresAuth: true,
    },
  },
];

// Route utilities
export const getRouteByName = (name: string): RouteConfig | undefined => {
  const findRoute = (routes: RouteConfig[]): RouteConfig | undefined => {
    for (const route of routes) {
      if (route.name === name) return route;
      if (route.children) {
        const found = findRoute(route.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findRoute(ROUTES);
};

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  const findRoute = (routes: RouteConfig[]): RouteConfig | undefined => {
    for (const route of routes) {
      if (route.path === path) return route;
      if (route.children) {
        const found = findRoute(route.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findRoute(ROUTES);
};

export const getMainRoutes = (): RouteConfig[] => {
  return ROUTES.filter(route => !route.path.includes(':'));
};