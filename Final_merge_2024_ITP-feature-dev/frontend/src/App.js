import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/Ucontex.js";

import TransportHome from "./component/Transport/transportHome";
import Addtranport from "./component/Transport/addtranport";
import ComplaintForm from "./complainnts/ComplaintsCreate";
import ComplaintsView from "./complainnts/ComplaintsView";
import ReplyComplaint from "./complainnts/ReplyComplaint";
import CreateADFeedBack from "./pages/Admin/CreateADFeedBack";
import FeedBackDetails from "./pages/Admin/FeedBackDetails.jsx";
import ViewADFeedBack from "./pages/Admin/ViewADFeedBack.jsx";
import UpdateADFeedBack from "./pages/Admin/UpdateADFeedBack.jsx";
import DeleteADFeedBack from "./pages/Admin/DeleteADFeedBack.jsx";
import AfterFeedBack from "./pages/Admin/AfterFeedBack.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar/Navbar.jsx";
import Sidebar from "./component/Sidebar/Sidebar.jsx";
import Addadmin from "./pages/Add/Add";
import AdminList from "./pages/List/List";
import AllOrders from "./pages/Orders/Orders";
import HomeCard from "./pages/foodcart/Home/Home.jsx";
import ExploreMenu from "./Context/ExploreMenu";
import ProductPage from "./inventry/Pages/ProductPage.jsx";

// ##############################################
import HeaderInventory from "../src/inventry/Components/Header";
import Homein from "./inventry/Pages/Home";
import FooterInventory from "../src/inventry/Components/Footer";
import AddProducts from "./inventry/Pages/AddProducts";
import PostProduct from "./inventry/Pages/PostProduct";
import SignUp from "./inventry/Pages/SignUp";
import SignIn from "./inventry/Pages/SignIn";
import PrivateRoute from "../src/inventry/Components/PrivateRoute.jsx";
import DashBoardInventory from "./inventry//Pages/DashBoard";
import OnlyAdminPrivateRoute from "../src/inventry/Components/OnlyAdminPrivateRoute";
import UpdateProducts from "./inventry//Pages/UpdateProduct";
import Cart from "./inventry/Pages/Cart";
import Ordersummary from "./inventry/Pages/Ordersummary";
import UpdateOrder from "./inventry/Pages/UpdateOrder";
import CheckoutSuccess from "./inventry/Pages/CheckoutSuccess";

import ForgetPassword from "./inventry/Pages/ForgetPassword";
import ResetPassword from "./inventry/Pages/ResetPassword";
import "./App.css";
// ##############################################  food #######################
import Cartfood from "../src/food/pages/Cart/Cart.jsx";
import LoginPopup from "../src/food/components/LoginPopup/LoginPopup";
import PlaceOrder from "../src/food/pages/PlaceOrder/PlaceOrder";
import MyOrders from "../src/food/pages/MyOrders/MyOrders";
import "react-toastify/dist/ReactToastify.css";
import Verify from "../src/food/pages/Verify/Verify";
import Homefood from "../src/food/pages/Home/Home";
import Navbarfood from "../src/food/components/Navbar/Navbar";
// ##############################################  roome reservation #######################
import HomeReservation from "./roomReservation/Components/Home/Home";
import NavReservation from "./roomReservation/Components/Nav/Nav";
import FooterReservation from "./roomReservation/Components/Footer/Footer.js";
import Accomodation from "./roomReservation/Components/Accomodation/Accomodation";
import CheckOut from "./roomReservation/Components/CheckOut/CheckOut";
import SidebarRoom from "./roomReservation/Components/Sidebar/Sidebar";

import Login from "./Auth/login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPasswordInventory from "./Auth/reset-password";
import Dashboard from "./DashBoard/Dashboard";
import AttendanceManagementPage from "./Employee/Attendance";
import Main from "../src/pages/Main.jsx";

//juthmini
import "./App.css";
import EmployeeManagementPage from "./Employee/Employee";
import LeaveTrackingPage from "./Employee/LeaveTracking";

const storedAuthToken = localStorage.getItem("authToken");
const storedUserType = localStorage.getItem("loggedInUserType");

const isAdminAuthenticated = () => {
  return storedAuthToken && storedUserType === "admin";
};

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    // <BrowserRouter>

    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Routes>
          {/* ############################################## foood done  ######################## */}

          <Route
            path="/homefood"
            element={
              <>
                <Navbarfood setShowLogin={setShowLogin} />
                <Homefood />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbarfood setShowLogin={setShowLogin} />
                <Cartfood />
              </>
            }
          />
          <Route
            path="/order"
            element={
              <>
                <Navbarfood setShowLogin={setShowLogin} />
                <PlaceOrder />
              </>
            }
          />
          <Route
            path="/myorders"
            element={
              <>
                <Navbarfood setShowLogin={setShowLogin} />
                <MyOrders />
              </>
            }
          />
          <Route
            path="/verify"
            element={
              <>
                <Navbarfood setShowLogin={setShowLogin} />
                <Verify />
              </>
            }
          />

          {/* ############################################## foood ######################## */}
        </Routes>
      </div>
      <UserProvider>
        {/* <Sidebar/>
      <Nav /> */}

        {/* /add footer room reservation  */}
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/transportHome" element={<TransportHome />} />
          <Route path="/addtranport" element={<Addtranport />} />
          {/* ###################### Complement done  ####################################################################### */}
          <Route path="/addcomplaints" element={<ComplaintForm />} />
          <Route path="/allcomplaints" element={<ComplaintsView />} />
          <Route path="/reply-complaint/:id" element={<ReplyComplaint />} />
          {/* ###################### Complement  ####################################################################### */}

          {/* ###################### feedback done  ####################################################################### */}
          <Route path="/feedBackDetail/create" element={<CreateADFeedBack />} />
          <Route path="/FeedBackDetails" element={<FeedBackDetails />} />
          <Route
            path="/feedBackDetail/details/:id"
            element={<ViewADFeedBack />}
          />
          <Route
            path="/feedBackDetail/edit/:id"
            element={<UpdateADFeedBack />}
          />
          <Route
            path="/feedBackDetail/delete/:id"
            element={<DeleteADFeedBack />}
          />
          <Route path="/AftRegDetails" element={<AfterFeedBack />} />
          {/* ################## feedback ####################################################################### */}

          <Route path="/explore-menu" element={<ExploreMenu />} />

          {/* ################## inventary done  ####################################################################### */}

          {/* <Route element={<PrivateRoute />} /> */}

          {/* <Route /> */}

          {/* <Route element={<OnlyAdminPrivateRoute />}> */}

          {/* </Route> */}

          {/* Routes with HeaderInventory and FooterInventory */}
          <Route
            path="/inventaryHome"
            element={
              <>
                <HeaderInventory />
                <Homein />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <HeaderInventory />
                <SignUp />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <HeaderInventory />
                <SignIn />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/product-page"
            element={
              <>
                <HeaderInventory />
                <ProductPage />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/product/:productSlug"
            element={
              <>
                <HeaderInventory />
                <PostProduct />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/forgetPassword"
            element={
              <>
                <HeaderInventory />
                <ForgetPassword />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/resetpassword/:id/:token"
            element={
              <>
                <HeaderInventory />
                <ResetPassword />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/dashboardinventory"
            element={
              <>
                <HeaderInventory />
                <DashBoardInventory />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <HeaderInventory />
                <Cart />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/order-summary"
            element={
              <>
                <HeaderInventory />
                <Ordersummary />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/order-pay-success"
            element={
              <>
                <HeaderInventory />
                <CheckoutSuccess />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/addproduct"
            element={
              <>
                <HeaderInventory />
                <AddProducts />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/update-product/:productId"
            element={
              <>
                <HeaderInventory />
                <UpdateProducts />
                <FooterInventory />
              </>
            }
          />
          <Route
            path="/update-order/:orderId"
            element={
              <>
                <HeaderInventory />
                <UpdateOrder />
                <FooterInventory />
              </>
            }
          />

          {/* ################## inventary done  ####################################################################### */}

          <Route path="/reply-complaint/:id" element={<ReplyComplaint />} />
          <Route path="/explore-menu" element={<ExploreMenu />} />

          {/* Routes with Sidebar and Navbar */}

          {/* Routes with Sidebar and Navbar */}
          <Route
            path="/add"
            element={
              <>
                <Navbar />
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ flexGrow: 1 }}>
                    <Addadmin />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/list"
            element={
              <>
                <Navbar />
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ flexGrow: 1 }}>
                    <AdminList />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Navbar />
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ flexGrow: 1 }}>
                    <AllOrders />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/room-reservation"
            element={
              <>
                <SidebarRoom />
                <NavReservation />
                <HomeReservation />
                <FooterReservation />
              </>
            }
          />
          <Route
            path="/room-reservation"
            element={
              <>
                <SidebarRoom />
                <NavReservation />
                <HomeReservation />
                <FooterReservation />
              </>
            }
          />
          <Route
            path="/Accomodation"
            element={
              <>
                <SidebarRoom />
                <NavReservation />
                <Accomodation />
                <FooterReservation />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <SidebarRoom />
                <NavReservation />
                <CheckOut />
                <FooterReservation />
              </>
            }
          />
          {/* ################## iEmployeee done   ####################################################################### */}
          <Route path="/employee" element={<EmployeeManagementPage />} />
          <Route path="/leaveTracking" element={<LeaveTrackingPage />} />

          <Route path="/inventory" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<AttendanceManagementPage />} />
        </Routes>

        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
