import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);

  useEffect(() => {
    if (userInfo && userInfo.is_verified === 0) {
      toast("Please update your password first.", { type: "notice" });
    }
  }, [userInfo]);

  return userInfo ? (
    userInfo.is_verified === 0 ? (
      <Navigate to="/update-password" replace />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
