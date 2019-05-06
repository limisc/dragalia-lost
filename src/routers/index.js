import { StatsCalc } from 'views';

const routers = [
  {
    id: 1,
    path: '/stats/:lang?',
    component: StatsCalc,
  },
  // {
  //   id: '1',
  //   path: '/weapon/:lang(en|ja|zh)?',
  //   component: undefined,
  // },
  // {
  //   id: '2',
  //   path: '/facility/:lang(en|ja|zh)?',
  //   component: undefined,
  // },
];

export default routers;
