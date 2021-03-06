// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = name => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Customer',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'bill',
    path: '/dashboard/bill',
    icon: getIcon('clarity:dollar-bill-line'),
  },
  {
    title: 'coupon',
    path: '/dashboard/coupon',
    icon: getIcon('bxs:coupon'),
  },
  {
    title: 'message',
    path: '/dashboard/message',
    icon: getIcon('carbon:email'),
  },
];

export default sidebarConfig;
