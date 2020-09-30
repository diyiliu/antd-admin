import { lazy } from "react";

const Home = lazy(() => import("../pages/home/Home"));

const Truck = lazy(() => import("../pages/vehicle/Truck"));
const TruckAdd = lazy(() => import("../pages/vehicle/TruckAdd"));

const SysUser = lazy(() => import("../pages/system/User"));
const SysRole = lazy(() => import("../pages/system/Role"));

export default [
  { path: "/", name: "Home", exact: true },
  { path: "/home", name: "Home", component: Home },

  { path: "/truck", name: "Truck", component: Truck , exact: true},
  { path: "/truck/list", name: "Truck", component: Truck },
  { path: "/truck/add", name: "TruckAdd", component: TruckAdd },

  { path: "/sys", name: "System", component: SysUser , exact: true},
  { path: "/sys/user", name: "SysUser", component: SysUser },
  { path: "/sys/role", name: "SysRole", component: SysRole },
];
