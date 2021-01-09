import React from 'react';

const AMap = React.lazy(() => import('./views/amap/AMapIndex'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/amap', name: 'AMap', component: AMap}
];

export default routes;
