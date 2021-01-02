import { MatxLoadable } from "matx";

const AppAMap = MatxLoadable({
  loader: () => import("./AppAMap")
});

const amapRoutes = [
  {
    path: "/amap",
    component: AppAMap
  }
];

export default amapRoutes;
