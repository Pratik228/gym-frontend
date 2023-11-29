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
	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);

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
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		// isMenuOpen = false;
		console.log(isMenuOpen);
	};

	return (
		<div className="bg-gray-800 shadow-md mb-8">
			<div className="container mx-auto flex items-center justify-between">
				<div className="flex items-center">
					<img
						src="/img/Logo.png"
						alt="MinimalAura Logo"
						className="w-24 h-24"
					/>
					<div className="text-2xl font-semibold">MinimalAura</div>
				</div>
				<div className="flex space-x-6 items-center">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive
								? "text-indigo-400 hover:text-indigo-500"
								: "hover:text-indigo-500"
						}>
						Home
					</NavLink>
					<NavLink
						to="/products"
						className={({ isActive }) =>
							isActive
								? "text-indigo-400 hover:text-indigo-500"
								: "hover:text-indigo-500"
						}>
						Products
					</NavLink>
					{userInfo && (
						<NavLink
							to="/profile"
							className={({ isActive }) =>
								isActive
									? "text-indigo-400 hover:text-indigo-500"
									: "hover:text-indigo-500"
							}>
							Profile
						</NavLink>
					)}
					<NavLink
						to="/cart"
						className={({ isActive }) =>
							isActive
								? "text-indigo-400 hover:text-indigo-500"
								: "hover:text-indigo-500"
						}>
						<div className="flex items-center space-x-3">
							<Badge
								badgeContent={itemCount()}
								color="primary"
								overlap="circular">
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
						}>
						<SupportAgentIcon className="hover:text-indigo-500 mr-2  cursor-pointer" />
						<span className="mr-2">Service</span>
					</NavLink>

					{userInfo ? (
						<>
							<div
								onClick={handleMenuOpen}
								className="flex items-center space-x-2">
								<AccountCircleIcon className="hover:text-indigo-500 cursor-pointer" />
								<div className="hover:text-indigo-500 cursor-pointer">
									{userInfo.name}
								</div>

								<Menu
									anchorEl={anchorEl}
									open={isMenuOpen}
									onClose={handleMenuClose}>
									<NavLink to="/my-orders">
										<MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
									</NavLink>

									<MenuItem onClick={handleMenuClose}>Track Order</MenuItem>
								</Menu>
							</div>

							<LogoutIcon
								className="hover:text-indigo-500 cursor-pointer"
								onClick={logoutHandler}
							/>
						</>
					) : (
						<NavLink
							to="/login"
							className={({ isActive }) =>
								isActive
									? "text-indigo-400 hover:text-indigo-500"
									: "hover:text-indigo-500"
							}>
							Login
						</NavLink>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
