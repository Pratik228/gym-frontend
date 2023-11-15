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
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 px-6">
			<div className="w-full max-w-md bg-gray-900 rounded-lg shadow-md p-6">
				<h2 className="text-2xl font-semibold text-white text-center mb-6">
					Update Password
				</h2>
				<form
					onSubmit={handleSubmit}
					className="space-y-4">
					<div>
						<label
							htmlFor="password"
							className="block text-md font-medium text-gray-300 mb-2">
							Password
						</label>
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
							className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
						/>
						{passwordError && (
							<p className="text-red-500 text-sm mt-1">{passwordError}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="confirm-password"
							className="block text-md font-medium text-gray-300 mb-2">
							Confirm Password
						</label>
						<input
							id="confirm-password"
							name="confirm-password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="new-password"
							className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
						/>
						{confirmPasswordError && (
							<p className="text-red-500 text-sm mt-1">
								{confirmPasswordError}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full flex justify-center rounded-md bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
						Update Password
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdatePassword;
