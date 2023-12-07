import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
const defaultProfilePic = "https://loremflickr.com/640/360";
import { useNavigate } from "react-router-dom";
function Profile() {
	const { userInfo } = useSelector((state) => state.auth);
	const [photo, setPhoto] = useState(defaultProfilePic);
	const [user, setUser] = useState(userInfo);
	const [updateUser, { isLoading }] = useUpdateUserMutation();
	const navigate = useNavigate();
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setPhoto(e.target.result);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleProfileSubmit = async (e) => {
		e.preventDefault();

		try {
			const { name, phone, gender } = user;
			const res = await updateUser({ name, phone, gender }).unwrap();
			console.log("Profile Updated");
		} catch (err) {
			console.log(err);

			if (!err.data) {
				navigate("/maintenance");
			} else {
				// Handle other types of errors
				setServerError(err?.data?.message || "An error occurred during login.");
			}
		}
	};
	return (
		<>
			<form>
				<img
					src={photo}
					alt="Profile Photo"
					className="mb-5 w-48 h-48"
				/>

				<label className="block text-lg font-medium text-white mb-4">
					Change Photo
					<input
						type="file"
						onChange={handleFileChange}
						className="mt-2 block w-full p-1"
					/>
				</label>
				<div className="mt-4 grid grid-cols-2 gap-8">
					{/* Name */}
					<div>
						<label className="block text-lg font-medium text-white">
							Name
							<input
								type="text"
								value={user?.name}
								onChange={(e) =>
									setUser((prev) => ({ ...prev, name: e.target.value }))
								}
								className="mt-2 block w-full p-1 mt-2 bg-white text-black opacity-50"
							/>
						</label>
					</div>
					{/* Email */}
					<div>
						<label className="block text-lg font-medium text-white">
							Email
							<input
								type="email"
								value={user?.email}
								disabled={true}
								className="mt-2 block w-full p-1 bg-white text-black opacity-50"
							/>
						</label>
					</div>
					{/* Phone */}
					<label className="block text-lg font-medium text-white">
						Phone
						<input
							type="phone"
							value={user?.phone || " "}
							onChange={(e) =>
								setUser((prev) => ({ ...prev, phone: e.target.value }))
							}
							className="mt-2 block w-full p-1 bg-white text-black opacity-50 "
						/>
					</label>
					{/* Gender */}
					<label className="block text-lg font-medium text-white">
						Gender
						<input
							type="phone"
							value={user?.gender}
							onChange={(e) =>
								setUser((prev) => ({ ...prev, gender: e.target.value }))
							}
							className="mt-2 block w-full p-1 bg-white text-black opacity-50 "
						/>
					</label>
				</div>

				<button
					onClick={handleProfileSubmit}
					className="mt-4 btn-primary">
					Update Profile
				</button>
			</form>
		</>
	);
}

export default Profile;
