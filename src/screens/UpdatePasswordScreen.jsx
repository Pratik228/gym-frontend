import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { CheckCircleRounded } from "@mui/icons-material";
import { showSnackbar } from "../slices/snackbarSlice";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmSuccess, setConfirmSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { id } = userInfo;
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect");

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const validatePassword = (newPassword) => {
    if (!newPassword) {
      setPasswordError("Password is required.");
      return false;
    } else if (newPassword.length < 8) {
      setPasswordError("Password should be at least 8 characters.");
      return false;
    } else if (!/[a-z]/.test(newPassword)) {
      setPasswordError(
        "Password should contain at least one lowercase letter."
      );
      return false;
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError(
        "Password should contain at least one uppercase letter."
      );
      return false;
    } else if (!/[0-9]/.test(newPassword)) {
      setPasswordError("Password should contain at least one digit.");
      return false;
    } else if (!/[!@#$%^&*]/.test(newPassword)) {
      setPasswordError(
        "Password should contain at least one special character (!@#$%^&*)."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = (pass, confirmPass) => {
    if (pass === confirmPass) {
      setConfirmPasswordError("");
      setConfirmSuccess(true);
    } else {
      setConfirmPasswordError("Passwords do not match.");
      setConfirmSuccess(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (validatePassword(password)) {
      validateConfirmPassword(password, confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmSuccess) {
      const res = await updatePassword({ id, password }).unwrap();

      dispatch(
        showSnackbar({
          message: "Password updated successfully!",
          severity: "success",
        })
      );
      dispatch(setCredentials({ ...res }));
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 px-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Update Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-md font-medium text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              autoComplete="new-password"
              className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {confirmSuccess && (
            <div className="flex items-center text-green-500 text-sm mt-1">
              <CheckCircleRounded fontSize="small" />
              <span className="ml-2">Looks good!</span>
            </div>
          )}

          <ul className="list-disc pl-5 space-y-1 text-gray-500">
            <li>Password must be at least 8 characters long.</li>
            <li>Include at least one lowercase letter.</li>
            <li>Include at least one uppercase letter.</li>
            <li>Include at least one digit.</li>
            <li>Include at least one special character (!@#$%^&*).</li>
          </ul>

          <button
            type="submit"
            className="w-full flex justify-center rounded-md bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
