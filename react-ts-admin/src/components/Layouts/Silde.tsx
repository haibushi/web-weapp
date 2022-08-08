import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import routeItems from "../../routes/routeItems";
import type { RouteItemType } from "../../routes/routeItems";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default () => {
  const renderMenu = ({ label, path, icon }: RouteItemType) => {
    return (
      <Menu.Item key={path}>
        <Link to={path}>
          <span>{label}</span>
        </Link>
      </Menu.Item>
    );
  };
  const openMenu = () => {};
  const selectMenu = () => {};
  const renderSubMnenu = ({ label, path, icon, children }: RouteItemType) => {
    return (
      <SubMenu key={path} title={label}>
        {children &&
          children.map((item) => {
            return item.children && item.children.length > 0
              ? renderSubMnenu(item)
              : renderMenu(item);
          })}
      </SubMenu>
    );
  };
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        onOpenChange={openMenu}
        onClick={selectMenu}
        theme="dark"
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
      >
        {routeItems &&
          routeItems.map((routes) => {
            return routes.children && routes.children.length > 0
              ? renderSubMnenu(routes)
              : renderMenu(routes);
          })}
      </Menu>
    </Sider>
  );
};
