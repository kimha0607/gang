import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Trang chủ',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Từ vựng',
    path: '/vocabulary-list',
    icon: icon('ic-cart'),
  },
];
