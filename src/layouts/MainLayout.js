import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import User from "../pages/User";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
        >
          <Menu.Item key="1">
            <HomeOutlined />
            <span>首页</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item key="2">
            <UserOutlined />
            <span>用户</span>
            <Link to="/user" />
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <MenuOutlined className="trigger" onClick={toggle} />
        </Header>
        <Content className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={User} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
