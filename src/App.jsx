import { Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/ProductScreen";
import CustomerProfileScreen from "./screens/CustomerProfileScreen";
import Layout from "./components/Layout";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CartScreen from "./screens/CartScreen";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route element={<Layout />}>
          <Route index path="/" element={<HomeScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/profile" element={<CustomerProfileScreen />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
