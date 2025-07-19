import { useState, useEffect, useCallback } from 'react';
import { ROUTES, RouteConfig, getRouteByPath } from '../config/routes';
import { PathUtils } from '../utils/paths';

interface RouterState {
  currentPath: string;
  currentRoute: RouteConfig | null;
  params: Record<string, string>;
  query: Record<string, string>;
}

export const useRouter = () => {
  const [state, setState] = useState<RouterState>(() => {
    const path = window.location.pathname;
    const search = window.location.search;
    const route = getRouteByPath(path);
    
    return {
      currentPath: path,
      currentRoute: route || null,
      params: {},
      query: PathUtils.parseQuery(search),
    };
  });

  const navigate = useCallback((path: string, replace = false) => {
    const method = replace ? 'replaceState' : 'pushState';
    window.history[method]({}, '', path);
    
    const route = getRouteByPath(path);
    setState({
      currentPath: path,
      currentRoute: route || null,
      params: {},
      query: PathUtils.parseQuery(window.location.search),
    });
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const goForward = useCallback(() => {
    window.history.forward();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      const route = getRouteByPath(path);
      
      setState({
        currentPath: path,
        currentRoute: route || null,
        params: {},
        query: PathUtils.parseQuery(search),
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    ...state,
    navigate,
    goBack,
    goForward,
    routes: ROUTES,
  };
};