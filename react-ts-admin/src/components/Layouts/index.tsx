import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import Silde from "./Silde";
import ShopHeader from "./Header";
import routeItems, { RouteItemType } from "../../routes/routeItems";

const { Header, Content } = Layout;

const Layouts = () => {
  const renderRoutea = () => {
    const routes: Array<React.ReactNode> = [];
    const routeMap = (arr: RouteItemType[]) => {
      arr.forEach((route) => {
        routes.push(
          <Route
            path={route.path}
            key={route.path}
            element={route.component}
          />,
        );
        if (route.children && route.children.length) routeMap(route.children);
      });
    };
    routeMap(routeItems);

    return routes;
  };
  return (
    <Layout>
      <Header className="header">
        <ShopHeader />
      </Header>
      <Layout>
        <Silde />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>{renderRoutea()}</Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Layouts;
