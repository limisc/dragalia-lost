import { Donation, StatsCalc } from 'views';

const routers = [
  {
    id: 0,
    path: '/donation/:lang?',
    component: Donation,
  },
  {
    id: 1,
    path: '/stats/:lang?',
    component: StatsCalc,
  },
];

export default routers;
