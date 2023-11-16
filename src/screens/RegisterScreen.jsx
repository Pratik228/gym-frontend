import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { showSnackbar } from "../slices/snackbarSlice";
import { CircularProgress } from "@mui/material";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const validateInput = () => {
    let isValid = true;

    if (!name) {
      setNameError("Full Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is incorrect.");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    if (validateInput()) {
      try {
        const res = await register({ name, email }).unwrap();
        dispatch(
          showSnackbar({
            message: "A temporary Password has been sent to your account",
            severity: "success",
          })
        );
        navigate("/login");
      } catch (err) {
        console.log(err);
        setServerError(err?.data?.message || "An error occurred during login.");
      }
    }
  };
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-2/5">
        <img
          className="mx-auto w-48"
          src="../../public/img/Logo.png"
          alt="Clothing Store Logo"
        />
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-1/4 h-full">
        <div className="bg-gray-800 p-8 shadow rounded-lg h-full">
          <form className="space-y-8" onSubmit={submitHandler}>
            {serverError && (
              <div className="mb-4 bg-red-400 text-white text-center p-2 rounded">
                {serverError}
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="full-name"
                className="block text-lg font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="full-name"
                  name="full-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? <Loader /> : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
