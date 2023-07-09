import { Path } from '../../../data/enum/Path';

export type NavItem = {
  title: string;
  path: string;
  protected?: boolean;
};

export const menuData: Array<NavItem> = [
  {
    title: 'Tracklist',
    path: Path.Home,
  },
  // {
  //   title: 'My Account',
  //   path: Path.Account,
  //   protected: true,
  // },
  // {
  //   title: 'API Access',
  //   path: Path.APIAccess,
  // },
  // {
  //   title: 'About',
  //   path: Path.About,
  // },
  // {
  //   title: 'Pricing',
  //   path: Path.Pricing,
  // },
  // {
  //   title: 'FAQ',
  //   path: Path.FAQ,
  // },
  {
    title: 'Privacy Policy',
    path: Path.PrivacyPolicy,
  },
  {
    title: 'Cookie Policy',
    path: Path.CookiePolicy,
  },
  {
    title: 'Terms of Service',
    path: Path.Terms,
  },
  // {
  //   title: 'Contact',
  //   path: Path.Terms,
  // },
];
