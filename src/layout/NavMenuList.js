import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import ViewListIcon from "@material-ui/icons/ViewList";
import StoreIcon from "@material-ui/icons/Store";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import CategoryIcon from "@material-ui/icons/Category";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import NavMenuItem from "./NavMenuItem";

const menus = [
  {
    path: "/",
    text: "Dashbord",
    icon: <DashboardIcon />,
    tip: "Dashbord",
  },
  {
    path: "/users",
    text: "Manage Users",
    icon: <PeopleIcon />,
    tip: "Manage Users",
  },
  {
    path: "/brands",
    text: "Manage Brands",
    icon: <BrandingWatermarkIcon />,
    tip: "Manage Brands",
  },
  {
    path: "/categories",
    text: "Manage Categories",
    icon: <CategoryIcon />,
    tip: "Manage Categories",
  },
  {
    path: "/qrcodes",
    text: "Manage Qrcodes",
    icon: <BrandingWatermarkIcon />,
    tip: "Manage Qrcodes",
  },
  {
    path: "/products",
    text: "Manage Products",
    icon: <ViewListIcon />,
    tip: "Manage Products",
  },
  {
    path: "/orders",
    text: "Manage Orders",
    icon: <ShoppingCartIcon />,
    tip: "Manage Orders",
  },
  {
    path: "/payments",
    text: "Manage Payments",
    icon: <ShoppingCartIcon />,
    tip: "Manage Payments",
  },
  // {
  //   path: '/orders',
  //   text: 'Manage Orders',
  //   icon: <ShoppingCartIcon />,
  //   tip: 'Manage Orders',
  // },
];

const NavMenuList = () => (
  <List>
    {menus &&
      menus.length &&
      menus.map((menu) => <NavMenuItem key={menu.text} data={menu} />)}
  </List>
);

export default NavMenuList;
