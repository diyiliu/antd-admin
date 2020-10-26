import { lazy } from "react";

const Home = lazy(() => import("../pages/home/Home"));

const Truck = lazy(() => import("../pages/vehicle/Truck"));
const TruckAdd = lazy(() => import("../pages/vehicle/TruckAdd"));

const SysUser = lazy(() => import("../pages/system/User"));
const SysRole = lazy(() => import("../pages/system/Role"));
const SysMenu = lazy(() => import("../pages/system/Menu"));

export default [
  { path: "/", name: "default", component: Home },
  { path: "/home", name: "home", component: Home },

  { path: "/truck", name: "truck", component: Truck, exact: true },
  { path: "/truck/list", name: "truckList", component: Truck },
  { path: "/truck/add", name: "truckAdd", component: TruckAdd },

  { path: "/sys", name: "system", component: SysUser, exact: true },
  { path: "/sys/user", name: "sysUser", component: SysUser },
  { path: "/sys/role", name: "sysRole", component: SysRole },
  { path: "/sys/menu", name: "sysAsset", component: SysMenu },
];
