import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import App from "./App";

const { Header, Sider, Content } = Layout;

class SiderDemo extends Component {
  state = {
    collapsed: false,
    timer: null
  };
  componentDidMount() {
    this.hideLeft();
  }
  componentDidCatch() {
    clearTimeout(this.state.timer);
  }
  hideLeft = () => {
    clearTimeout(this.state.timer);
    const timer = setTimeout(() => {
      this.setState({ collapsed: true });
    }, 2000);
    this.setState({ timer });
  };
  toggle = () => {
    this.hideLeft();
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onClick={this.hideLeft}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <div style={{ padding: "24px 16px", overflow: "auto" }}>
            <Content
              style={{
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <App />
            </Content>
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
