import React, { useState } from "react";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "./assets/logo.png";
import Hotel from "./pages/hotel";
import Dashboard from "./pages/dashboard";
import Customer from "./pages/customer";
import CustomerCreate from "./pages/customer/create";
import CustomerEdit from "./pages/customer/edit";


import HotelCreate from "./pages/hotel/create";
import Addroom from "./pages/hotel/addroom";
import HotelEdit from "./pages/hotel/edit";
import Category from "./pages/bookhotel/category";
import Detail from "./pages/bookhotel/detail";
import BookingHotel from "./pages/bookhotel/booking";
import ShowRecord from "./pages/bookhotel";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("แดชบอร์ด", "1", <DashboardOutlined />),
  getItem("ข้อมูลสมาชิก", "2", <UserOutlined />),
  getItem("ข้อมูลที่พัก", "3", <UserOutlined />),
];

const App: React.FC = () => {
  const page = localStorage.getItem("page");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "40%", borderRadius: "50%" }}
            />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={[page ? page : "dashboard"]}
            mode="inline"
          >
            <Menu.Item key="dashboard" onClick={() => setCurrentPage("dashboard")}>
              <Link to="/">
                <DashboardOutlined />
                <span>แดชบอร์ด</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="customer" onClick={() => setCurrentPage("customer")}>
              <Link to="/customer">
                <UserOutlined />
                <span>ข้อมูลสมาชิก</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="hotel" onClick={() => setCurrentPage("hotel")}>
              <Link to="/hotel">
                <UserOutlined />
                <span>ข้อมูลที่พัก</span>
              </Link>
            </Menu.Item>
          </Menu>
      
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }} />
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/customer/create" element={<CustomerCreate />} />
                <Route path="/customer/edit/:id" element={<CustomerEdit />} />
                <Route path="/hotel/addroom/:id" element={<Addroom />} />
                <Route path="/hotel/edit/:id" element={<HotelEdit />} />
                <Route path="/hotel/detail/:id" element={<Detail />} />
                <Route path="/hotel" element={<Hotel />} />
                <Route path="/hotel/create" element={<HotelCreate />} />
                <Route path="/category" element={<Category />} />
                <Route path="/hotel/detail/:id/room/:id2" element={<BookingHotel />} />
                <Route path="/showrecord" element={<ShowRecord />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            System Analysis and Design 1/66
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
