import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
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
    icon: 'icon-ban',
  },
  {
    name: 'Model',
    url: '/admin/models',
    icon: 'icon-ban',
  },
];
