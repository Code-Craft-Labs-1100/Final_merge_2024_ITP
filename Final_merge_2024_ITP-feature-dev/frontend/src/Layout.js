import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  CalendarOutlined,
  TableOutlined,
  FileDoneOutlined,
  AppstoreAddOutlined,
  FireOutlined,
  DollarCircleOutlined,
  ApiOutlined,
  CheckCircleOutlined,
  FormOutlined,
  TeamOutlined,
  CarOutlined,
  ApartmentOutlined,
  StockOutlined,
  SyncOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  CoffeeOutlined,
  BellOutlined,
  ClockCircleOutlined,
  StarOutlined,
  ReadOutlined,
  EnvironmentOutlined,
  SlackOutlined,
  RestOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import imageSrc from "./logo.png";

const { Header, Content, Footer, Sider } = Layout;
const loggedInUserType = localStorage.getItem("loggedInUserType");

const adminUserItems = [
  {
    key: "dashboard",
    icon: <HomeOutlined />,
    label: "Home",
  },
  
  // Menu Management System
  

  // Inventory Management System
  

  // Employee Management
  {
    key: "employee",
    icon: <TeamOutlined />,
    label: "Employee Management",
    children: [
      {
        key: "employee",
        icon: <StarOutlined />,
        label: "Employee",
      },
      {
        key: "attendance",
        icon: <ClockCircleOutlined />,
        label: "Attendance",
      },
      {
        key: "payroll",
        icon: <DollarCircleOutlined />,
        label: "Payroll",
      },
      {
        key: "leaveRequest",
        icon: <ReadOutlined />,
        label: "Leave Tracking",
      },
    ],
  },

  // Events Management System
  

  // Transport Management System
 

  // Additional Service System
  
];

const employeeUserItems = [
  {
    key: "dashboard",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "employee",
    icon: <TeamOutlined />,
    label: "Employee",
  },
  {
    key: "employee",
    icon: <TeamOutlined />,
    label: "Attendance & Leave",
    children: [
      {
        key: "attendance",
        icon: <ClockCircleOutlined />,
        label: "Attendance",
      },
      {
        key: "leaveRequest",
        icon: <ReadOutlined />,
        label: "Leave Request",
      },
    ],
  },
];

const headerIteam = [
  { key: "1", text: "User", icon: <UserSwitchOutlined /> },
  { key: "2", text: "LogOut", icon: <LogoutOutlined /> },
];
const App = ({ children ,userType }) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const handleHeaderClick = (key) => {
    if (key === "2") {
      localStorage.setItem("authToken", null);
      localStorage.setItem("loggedInUserType", null);
      navigate("/");
    }
  };
  const [isBackTopVisible, setIsBackTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsBackTopVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleMenuClick = (item) => {
    if (item.key === "dashboard") {
      navigate("/dashboard");
    }

    if (item.key === "rooms") {
      navigate("/rooms");
    }
    if (item.key === "bookings") {
      navigate("/bookings");
    }
    if (item.key === "payments") {
      navigate("/payments");
    }

    if (item.key === "menus") {
      navigate("/menus");
    }
    if (item.key === "orders") {
      navigate("/orders");
    }
    if (item.key === "orderTracking") {
      navigate("/orderTracking");
    }

    if (item.key === "departments") {
      navigate("/departments");
    }
    if (item.key === "stocks") {
      navigate("/stocks");
    }
    if (item.key === "suppliers") {
      navigate("/suppliers");
    }

    if (item.key === "employee") {
      navigate("/employee");
    }
    if (item.key === "attendance") {
      navigate("/attendance");
    }
    if (item.key === "payrollBenefits") {
      navigate("/payrollBenefitsAdministration");
    }
    if (item.key === "leaveRequest") {
      navigate("/leaveTracking");
    }

    if (item.key === "eventLocations") {
      navigate("/event-locations");
    }
    if (item.key === "events") {
      navigate("/events");
    }
    if (item.key === "eventRequests") {
      navigate("/event-requests");
    }

    if (item.key === "drivers") {
      navigate("/drivers");
    }
    if (item.key === "vehicles") {
      navigate("/vehicles");
    }
    if (item.key === "transports") {
      navigate("/transports");
    }
    if (item.key === "trackTravels") {
      navigate("/travel-tracking");
    }

    if (item.key === "additionalServices") {
      navigate("/additional-services");
    }
    if (item.key === "additionalServicesRequests") {
      navigate("/additional-service-requests");
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
      >
        <div className="demo-logo-vertical">
          <img src={imageSrc} alt="Description of your image" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={
            userType === "admin" ? adminUserItems : employeeUserItems
          }
          onClick={handleMenuClick}
          style={{
            position: "sticky",
            marginTop: "10px",
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="demo-logo" />
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {headerIteam.map((item) => (
              <Button
                key={item.key}
                type="text"
                icon={item.icon}
                style={{ color: "white" }}
                onClick={() => handleHeaderClick(item.key)}
              >
                {item.text}
              </Button>
            ))}
          </div>
        </Header>
        <Content
          style={{
            margin: "0 20px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: borderRadiusLG,
            }}
          >
            {isBackTopVisible && (
              <FloatButton.Group
                shape="circle"
                style={{
                  right: 24,
                }}
              >
                <FloatButton.BackTop visibilityHeight={0} />
              </FloatButton.Group>
            )}
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};
export default App;
