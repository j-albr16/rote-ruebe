export enum AppRoutes {
  Dashboard = 'dashboard',
  Social = 'social',
  Auth = 'auth',
  Home = 'home'
}

export enum ViewMode {
  List,
  Wrap
}

/**
 * Methode that return the Redirect string url
 * Example:
 * Route = 'dashboard'
 * navRoute = '/dashboard'
 */
export const navRoute = (appRoute: AppRoutes): string => {
  return `/${appRoute}`;
};
