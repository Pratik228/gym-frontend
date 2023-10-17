import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import { showSnackbar } from "../slices/snackbarSlice";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
      dispatch(
        showSnackbar({
          message: "Logged out successfully!",
          severity: "success",
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* ... Logo and Brand Name ... */}

        <div className="flex items-center">
          {/* Increased logo width and height for zoom effect */}
          <img
            src="/img/Logo.png"
            alt="MinimalAura Logo"
            className="w-24 h-24"
          />
          <div className="text-2xl font-semibold">MinimalAura</div>
        </div>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-indigo-400 hover:text-indigo-500">
            Home
          </Link>
          <Link to="/products" className="hover:text-indigo-500">
            Products
          </Link>

          {/* Search Icon */}
          <SearchIcon className="hover:text-indigo-500 cursor-pointer" />
          {/* Cart Icon */}
          <ShoppingCartIcon className="hover:text-indigo-500 cursor-pointer" />

          {/* Conditional Rendering for User */}
          {userInfo ? (
            <>
              <div className="flex items-center space-x-2">
                <AccountCircleIcon className="hover:text-indigo-500 cursor-pointer" />
                <div className="hover:text-indigo-500 cursor-pointer">
                  {userInfo.name}
                </div>
              </div>

              {/* Logout */}
              <LogoutIcon
                className="hover:text-indigo-500 cursor-pointer"
                onClick={logoutHandler}
              />
            </>
          ) : (
            <Link to="/login" className="hover:text-indigo-500">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
