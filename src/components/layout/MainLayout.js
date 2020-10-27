import React, { useState, useEffect } from "react";
import { Layout, Menu, Spin, Dropdown, Avatar, ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Route, Link, useLocation } from "react-router-dom";
import Iconant from "components/icon/Iconant";
import Bread from "components/bread/Bread";

import routes from "assets/routes";
import config from "utils/config";

import { logout } from "utils/auth";
import UserImg from "assets/images/user.png";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const MainLayout = ({ history, context }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selecteds, setSelecteds] = useState([]);
  const [opens, setOpens] = useState([]);
  const [crumbs, setCrumbs] = useState([]);

  const { menus, user } = context;

  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    if (menus) {
      const getMenu = (path) => {
        const menu =
          menus.find((m) => m.url === path || path.startsWith(m.url)) ||
          menus[0];
        return menu;
      };

      const menu = getMenu(pathname);
      const { name, children } = menu;

      if (children) {
        setOpens([name]);
        const child = children.find((c) => pathname === c.url) || children[0];
        setSelecteds([child.name]);

        setCrumbs([
          { name: "首页", url: "/" },
          { name, url: menu.url },
          { name: child.name },
        ]);
      } else {
        setSelecteds([name]);

        if ("首页" === name) {
          setCrumbs([{ name: "首页" }]);
        } else {
          setCrumbs([{ name: "首页", url: "/" }, { name }]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, menus]);

  const openHandle = (openKeys) => {
    setOpens(openKeys);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const menuItem = (menu) => {
    const { name, icon, url, children, hidden } = menu;
    if (hidden === 1) {
      return <></>;
    }

    const IconItem = <Iconant type={icon} />;
    if (children) {
      const list = children.filter((child) => child.hidden !== 1);
      return (
        <SubMenu key={name} icon={IconItem} title={name}>
          {list.map((child) => {
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

  const topnav = (
    <Menu>
      <Menu.Item>
        <Iconant type="UserOutlined" /> 个人中心
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={() => {
          logout().then(() => {
            history.push("/login");
          });
        }}
      >
        <Iconant type="LogoutOutlined" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <ConfigProvider locale={zhCN}>
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

          {user && (
            <ul className="topnav-menu">
              <li>
                <span className="notice">
                  <Iconant type="BellOutlined" />
                </span>
              </li>
              <li>
                <Dropdown overlay={topnav}>
                  <span className="user">
                    <Avatar size={24} src={UserImg} />
                    <span>{user.name}</span>
                  </span>
                </Dropdown>
              </li>
            </ul>
          )}
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
              {menus &&
                menus.map((menu) => {
                  return menuItem(menu);
                })}
            </Menu>
          </Sider>

          <Layout>
            <Content className="content">
              <Bread crumbs={crumbs} />
              <React.Suspense
                fallback={
                  <div className="load-page">
                    <Spin
                      indicator={
                        <Iconant
                          type="LoadingOutlined"
                          style={{ fontSize: "24px" }}
                        />
                      }
                    />
                  </div>
                }
              >
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
    </ConfigProvider>
  );
};

export default MainLayout;
