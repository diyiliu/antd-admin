import React, {useState} from "react";
import {Layout, Menu} from "antd";
import {Route, Link} from "react-router-dom";
import Iconant from "../components/Iconant";

import routes from "../assets/routes";
import menus from "../assets/menus";
import config from "../utils/config";

const {SubMenu} = Menu;
const {Header, Sider, Content} = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const menuItem = (menu) => {
        const {name, icon, url, children} = menu;
        const IconItem = <Iconant type={icon}/>;

        if (children) {
            return (
                <SubMenu key={name} icon={IconItem} title={name}>
                    {children.map((child) => {
                        const {name, url} = child;
                        return (
                            <Menu.Item key={name}>
                                <span>{name}</span>
                                <Link to={url}/>
                            </Menu.Item>
                        );
                    })}
                </SubMenu>
            );
        }

        return (
            <Menu.Item key={name}>
                <Iconant type={icon}/>
                <span>{name}</span>
                <Link to={url}/>
            </Menu.Item>
        );
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="brand">
                    <div className="logo">
                        <img alt="logo" src={config.logoPath}/>
                        {!collapsed && <h1>{config.siteName}</h1>}
                    </div>
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    // defaultSelectedKeys={["1"]}
                    // defaultOpenKeys={["sub1"]}
                >
                    {menus.map((menu) => {
                        return menuItem(menu);
                    })}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>
          <span className="trigger" onClick={toggle}>
            <Iconant type="MenuOutlined"/>
          </span>
                </Header>
                <Content className="content">
                    <React.Suspense fallback={<div>ABC</div>}>
                        {routes.map((route, index) => {
                            return route.component ? (
                                <Route
                                    key={index}
                                    exact={route.exact}
                                    path={route.path}
                                    name={route.name}
                                    component={route.component}
                                />
                            ) : null;
                        })}
                    </React.Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
