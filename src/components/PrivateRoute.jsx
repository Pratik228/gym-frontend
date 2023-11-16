import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoute = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	console.log(userInfo);

	useEffect(() => {
		if (!userInfo) {
			navigate("/login", { replace: true });
		} else if (userInfo.is_verified === 0) {
			console.log("Inside Private Route");
			toast("Please update your password first.", { type: "notice" });
			navigate("/update-password", { replace: true });
		}
	}, [userInfo, navigate]);

	return userInfo && userInfo.is_verified !== 0 ? <Outlet /> : null;
};

export default PrivateRoute;
