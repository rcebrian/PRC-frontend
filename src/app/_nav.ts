import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cui-dashboard',
  },
  {
    title: true,
    name: 'Destinations',
  },
  {
    name: 'Airports',
    url: '/airports',
    icon: 'icon-location-pin'
  },
  {
    title: true,
    name: 'Administrator',
  },
  {
    name: 'Scrapers',
    url: '/admin/scrapers',
    icon: 'icon-globe',
  },
  {
    name: 'Model',
    url: '/admin/models',
    icon: 'icon-pencil',
  },
  {
    name: 'Statistic',
    url: '/admin/statistics',
    icon: 'icon-pie-chart',
  },
];
