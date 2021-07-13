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

export enum Svg {
  Add = 'add',
  CLose = 'close',
  DateRange = 'date_range',
  Delete = 'delete',
  Done = 'done',
  Edit = 'filter',
  Event = 'event',
  FileUpload = 'file_upload',
  FilterAlt = 'filter_alt',
  Folder = 'folder',
  GridOn = 'grid_on',
  List = 'list',
  MoneyOff = 'money_off',
  Grass = 'grass',
  Notification = 'notifications',
  Place = 'place',
  Search = 'search',
  Send = 'send',
  Settings = 'settings',
  ViewList = 'view_list',
  Person = 'person',
  Dashboard = 'dashboard',
  Flower = 'flower',
  AccountCircle = 'account_circle',
  Home = 'home',
}
