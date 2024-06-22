import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import { showSnackbar } from "../slices/snackbarSlice";
import { Badge } from "@mui/material";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { toast } from "react-toastify";

/* Refactor Later
 */
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      dispatch(
        showSnackbar({
          message: "Logged out successfully!",
          severity: "success",
        })
      );
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const itemCount = () => {
    let count = 0;
    cartItems.map((item) => {
      count += item.qty;
    });
    return count;
  };

  return (
    <div className="bg-gray-800 shadow-md mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/img/logo.png" alt="Fithub Logo" className="w-24 h-24" />
          <div className="text-2xl font-semibold">FitHub</div>
        </div>
        {userInfo && userInfo.isAdmin === 1 ? (
          <div className="flex space-x-6 items-center">
            <NavLink
              to="/admin/productlist"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-500"
                  : "hover:text-indigo-500"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/admin/orderlist"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-500"
                  : "hover:text-indigo-500"
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/admin/customer-service"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-500"
                  : "hover:text-indigo-500"
              }
            >
              Service
            </NavLink>
            <div className="flex items-center cursor-pointer">
              <AccountCircleIcon className="text-white" />
              <span className="text-white ml-2">{userInfo.name}</span>
            </div>
            <div className="flex items-center cursor-pointer ">
              <span
                onClick={logoutHandler}
                className="text-white ml-2 hover:text-indigo-500"
              >
                Logout
              </span>
            </div>
          </div>
        ) : (
          <div className="flex space-x-6 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-500"
                  : "hover:text-indigo-500"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-500"
                  : "hover:text-indigo-500"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-500"
                  : "hover:text-indigo-500"
              }
            >
              FAQ
            </NavLink>
            {userInfo && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-400 hover:text-indigo-500"
                    : "hover:text-indigo-500"
                }
              >
                Profile
              </NavLink>
            )}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-500"
                  : "hover:text-indigo-500"
              }
            >
              <div className="flex items-center space-x-3">
                <Badge
                  badgeContent={itemCount()}
                  color="primary"
                  overlap="circular"
                >
                  <ShoppingCartIcon className="hover:text-indigo-500 cursor-pointer" />
                </Badge>
                <span className="ml-2">Cart</span>
              </div>
            </NavLink>
            <NavLink
              to="/customer-service"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-500"
                  : "hover:text-indigo-500"
              }
            >
              <SupportAgentIcon className="hover:text-indigo-500 mr-2  cursor-pointer" />
              <span className="mr-2">Service</span>
            </NavLink>
            {userInfo ? (
              <>
                <div className="relative group">
                  <div className="flex items-center cursor-pointer">
                    <AccountCircleIcon className="text-white" />
                    <span className="text-white ml-2">{userInfo.name}</span>
                  </div>
                  <div className="absolute group-hover:block dropdown-menu hidden right-0 w-36 bg-gray-700 rounded-md shadow-xl z-20 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <ul className="py-2">
                      <li>
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-800 text-white"
                        >
                          My Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/my-orders"
                          className="block px-4 py-2 hover:bg-gray-800 text-white"
                        >
                          My Orders
                        </NavLink>
                      </li>
                      <li className="py-1">
                        <hr className="border-t border-gray-600" />
                        <span
                          onClick={logoutHandler}
                          className="block px-4 py-2 hover:bg-gray-800 text-white cursor-pointer"
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-400 hover:text-indigo-500"
                    : "hover:text-indigo-500"
                }
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
