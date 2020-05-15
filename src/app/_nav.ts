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
    icon: 'icon-drop'
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
    name: 'Train',
    url: '/admin/train',
    icon: 'icon-ban',
  },
];
