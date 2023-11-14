import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updatePassword } from "../actions/userActions"; // Replace with your update password action

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const validateInput = () => {
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters.");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError(
        "Password should contain at least one lowercase letter."
      );
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "Password should contain at least one uppercase letter."
      );
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password should contain at least one digit.");
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError(
        "Password should contain at least one special character (!@#$%^&*)."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInput()) {
      console.log(password);

      //   dispatch(updatePassword(userInfo.id, password));
      // Handle success and error cases, and navigate to the destination page
    }
  };

  return (
    <div className="relative mb-4 flex space-x-4">
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-lg font-medium text-gray-300 mb-2"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateInput(); // Call validateInput on every change to update error messages in real-time
            }}
            autoComplete="new-password"
            className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
          />
          <div className="text-sm mt-1">
            <ul className="list-disc pl-5 space-y-1 text-gray-500">
              <li>Password must be at least 8 characters long.</li>
              <li>Include at least one lowercase letter.</li>
              <li>Include at least one uppercase letter.</li>
              <li>Include at least one digit.</li>
              <li>Include at least one special character (!@#$%^&*).</li>
            </ul>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
        </div>
      </div>
      <br />
      <div className="w-1/2">
        <label
          htmlFor="confirm-password"
          className="block text-lg font-medium text-gray-300 mb-2"
        >
          Confirm Password
        </label>
        <div className="mt-1">
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Update Password
      </button>
    </div>
  );
};

export default UpdatePassword;
