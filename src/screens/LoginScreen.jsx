import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { hideSnackbar } from "../slices/snackbarSlice";
import { toast, ToastContainer } from "react-toastify";

import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
  const isFetching = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const snackbar = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo && userInfo.is_verified === 0) {
      console.log("I am Here");
      navigate("/update-password");
    } else if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const validateInput = () => {
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Basic regex check for email
      setEmailError("Email is incorrect.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      // Assuming minimum password length is 6
      setPasswordError("Password is too short.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();

      console.log("Auth Response", res);
      dispatch(setCredentials({ ...res }));
      console.log("Login Successful");
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      setServerError(err?.data?.message || "An error occurred during login.");

      //Show server error on the login screen
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-2/5">
          <img
            className="mx-auto w-48"
            src="../../public/img/Logo.png"
            alt="Clothing Store Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Welcome to Our Clothing Store
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            New here?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-400 hover:text-blue-500"
            >
              Create your account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto h-full">
          <div className="bg-gray-800 p-16 shadow rounded-lg h-full">
            <form className="space-y-8" onSubmit={submitHandler}>
              {serverError && (
                <div className="mb-4 bg-red-600 text-white text-center p-2 rounded">
                  {serverError}
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-300 mb-2"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                  />
                </div>
                {emailError && (
                  <div className="text-red-500 mt-2">{emailError}</div>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                  />
                </div>
                {passwordError && (
                  <div className="text-red-500 mt-2">{passwordError}</div>
                )}
              </div>

              <div className="flex items-center justify-between mb-4 gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-blue-400 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isFetching ? <Loader /> : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
