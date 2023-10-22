import React from "react";
import { Layout, Menu } from "antd";
import {
  CloudOutlined,
  UserOutlined,
  HomeOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

function Navbar() {
  const logo = process.env.PUBLIC_URL + "/assets/skycast weather-logo.png";

  return (
    <Header className="navbar">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        className="menu"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img
          className="logo"
          width={190}
          src={logo}
        />

        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          style={{ marginRight: "auto" }}>
          Home
        </Menu.Item>
        <Menu.Item
          key="weather"
          icon={<CloudOutlined />}
          style={{ marginRight: "auto" }}>
          Weather
        </Menu.Item>
        <Menu.Item
          key="notifications"
          icon={<NotificationOutlined />}
          style={{ marginRight: "auto" }}>
          Notifications
        </Menu.Item>

        <Menu.Item
          key="profile"
          icon={<UserOutlined />}
          style={{ marginLeft: "auto" }}>
          Profile
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
