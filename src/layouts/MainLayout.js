import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu } from "antd";
import { Route, Link, useLocation } from "react-router-dom";
import Iconant from "../components/Iconant";
import { MainContext } from "../useContext";

import routes from "../assets/routes";
import config from "../utils/config";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selecteds, setSelecteds] = useState([]);
  const [opens, setOpens] = useState([]);

  const context = useContext(MainContext);
  const { menus, getMenu } = context;

  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    const menu = getMenu(pathname);
    const { name, url, children } = menu;
    if (pathname === url) {
      setSelecteds([name]);
    }

    if (children) {
      setOpens([name]);
      const child = children.find((c) => pathname === c.url) || children[0];
      setSelecteds([child.name]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const openHandle = (openKeys) => {
    setOpens(openKeys);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const menuItem = (menu) => {
    const { name, icon, url, children } = menu;
    const IconItem = <Iconant type={icon} />;

    if (children) {
      return (
        <SubMenu key={name} icon={IconItem} title={name}>
          {children.map((child) => {
            const { name, url } = child;
            return (
              <Menu.Item key={name}>
                <span>{name}</span>
                <Link to={url} />
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={name}>
        <Iconant type={icon} />
        <span>{name}</span>
        <Link to={url} />
      </Menu.Item>
    );
  };

  return (
    <Layout>
      <Header className="header">
        <div className={`logo${collapsed ? " condensed" : ""}`}>
          <Link to="/">
            <img alt="logo" src={config.logoPath} />
            {!collapsed && <h1>{config.siteName}</h1>}
          </Link>
        </div>

        <span className="trigger" onClick={toggle}>
          <Iconant type="MenuOutlined" />
        </span>
      </Header>
      <Layout className="site-layout">
        <Sider
          width={240}
          className="site-layout-background"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={selecteds}
            openKeys={opens}
            onOpenChange={openHandle}
          >
            {menus.map((menu) => {
              return menuItem(menu);
            })}
          </Menu>
        </Sider>

        <Layout>
          <Content className="content">
            <React.Suspense fallback={<div>ABC</div>}>
              {routes.map((route, index) => {
                const { name, path, exact, component } = route;
                return component ? (
                  <Route
                    key={index}
                    exact={exact}
                    path={path}
                    name={name}
                    component={component}
                  />
                ) : null;
              })}
            </React.Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
