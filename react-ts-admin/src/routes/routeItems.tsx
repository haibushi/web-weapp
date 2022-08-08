import React from "react";
import About from "../views/about";
import Readme from "../views/readMe";
import Carousel from "../views/Carousel";
import Home from "../views/home";
import Product from "../views/Product";
import ProductCategory from "../views/ProductCategory";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
export interface RouteItemType {
  path: string;
  icon?: Function | string;
  label: string;
  meta?: {
    hidden?: boolean;
  };
  component: React.ReactNode;
  children?: Array<RouteItemType>;
}

const routeItems: Array<RouteItemType> = [
  {
    path: "/home",
    icon: UserOutlined,
    label: "首页",
    meta: {
      hidden: true,
    },
    component: <Home />,
  },
  {
    path: "/test",
    icon: LaptopOutlined,
    label: "关于我们",
    component: <About />,
    children: [
      {
        path: "/test/table",
        label: "列表",
        component: <About />,
      },
    ],
  },
  {
    path: "/slide",
    icon: NotificationOutlined,
    label: "轮播图管理",
    component: <Carousel />,
  },
  {
    path: "/product",
    icon: LaptopOutlined,
    label: "商品管理",
    component: <About />,
    children: [
      {
        path: "/product/category",
        label: "商品分类",
        component: <ProductCategory />,
      },
      {
        path: "/product/list",
        label: "商品列表",
        component: <Product />,
      },
    ],
  },
];

export default routeItems;
