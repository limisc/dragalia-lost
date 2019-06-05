import { Donation, StatsCalc, Facility } from 'views';

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
  {
    id: 2,
    path: '/facility/:lang?',
    component: Facility,
  },
];

export default routers;
