import { Route, Routes, redirect, useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-bootstrap";
import { Snackbar, Alert } from "@mui/material";
import Modal from "react-modal";
import { hideSnackbar, showSnackbar } from "./slices/snackbarSlice";

import CustomerService from "./screens/CustomerService";
import CustomerServiceScreen from "./screens/CustomerServiceScreen";
import Layout from "./components/Layout";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/ProductScreen";
import CustomerProfileScreen from "./screens/CustomerProfileScreen";
import AdminRoute from "./components/AdminRoute";
import MyOrders from "./screens/MyOrders";

import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import PrivateRoute from "./components/PrivateRoute";
import UpdatePassword from "./screens/UpdatePasswordScreen";
import { useDispatch, useSelector } from "react-redux";
import Maintenance from "./screens/Maintenance";
import Cart from "./screens/Cart";
import { useEffect } from "react";
import OrderDetail from "./screens/OrderDetail";
import Faq from "./screens/Faq";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

Modal.setAppElement("#root");

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const snackbar = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Modal.setAppElement("#root");
    if (userInfo && userInfo.is_verified === 0) {
      navigate("/update-password");
    }
  }, [userInfo]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Snackbar
        open={snackbar.show}
        autoHideDuration={6000}
        onClose={() => dispatch(hideSnackbar())}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(hideSnackbar())}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/faqs" element={<Faq />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        <Route element={<Layout />}>
          <Route index path="/" element={<HomeScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/customer-service" element={<CustomerServiceScreen />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<CustomerProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
          </Route>
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductListScreen />}
            />
            <Route
              path="/admin/customer-service"
              element={<CustomerService />}
            />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen />}
            />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
