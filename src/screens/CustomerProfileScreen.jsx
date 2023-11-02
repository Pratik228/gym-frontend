import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { FaTimes, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
// import { useProfileMutation } from "../slices/usersApiSlice";
// import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
// import { setCredentials } from "../slices/authSlice";
import { BASE_URL, USERS_URL } from "../constants";
const defaultProfilePic = "https://loremflickr.com/640/360"; // Path to your default image
const CustomerProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState(defaultProfilePic);

  // const { userInfo } = useSelector((state) => state.auth);
  // const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  // const [updateProfile, { isLoading: loadingUpdateProfile }] =
  //   useProfileMutation();

  // useEffect(() => {
  //   setName(userInfo.name);
  //   setEmail(userInfo.email);
  //   setGender(userInfo.gender || "");
  //   setPhoneNumber(userInfo.phoneNumber || "");
  //   setCountry(userInfo.country || "");
  //   setPhoto(userInfo.photo || defaultProfilePic);
  // }, [userInfo]);

  // const dispatch = useDispatch();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const emailParam = `${encodeURIComponent(userInfo.email)}`;
    const url = `${BASE_URL}${USERS_URL}/${emailParam}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gender: userInfo?.gender,
        phone: userInfo?.phoneNumber,
        cookies: {
          jwt: localStorage.getItem(""),
        },
      }),
    });

    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match");
    // } else {
    //   try {
    //     const res = await updateProfile({
    //       _id: userInfo._id,
    //       name,
    //       email,
    //       password,
    //       gender,
    //       phoneNumber,
    //       country,
    //       photo,
    //     }).unwrap();
    //     dispatch(setCredentials({ ...res }));
    //     toast.success("Profile updated successfully");
    //   } catch (err) {
    //     toast.error(err?.data?.message || err.error);
    //   }
    // }
  };

  return (
    <div className="flex justify-center bg-gray-900">
      <div className="w-4/5 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">User Profile</h2>
        <img src={photo} alt="Profile Photo" className="mb-5 w-48 h-48" />

        <label className="block text-lg font-medium text-white mb-4">
          Change Photo
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full p-1"
          />
        </label>

        <form onSubmit={submitHandler} className="mt-4 grid grid-cols-2 gap-8">
          {/* Name */}
          <div>
            <label className="block text-lg font-medium text-white">
              Name
              <input
                type="text"
                value={userInfo?.name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full p-1 mt-2 bg-white text-black opacity-50"
                disabled
              />
            </label>
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-white">
              Email
              <input
                type="email"
                value={userInfo?.email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full p-1 bg-white text-black opacity-50"
                disabled
              />
            </label>
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium text-white">
              Password
              <input
                type="password"
                value={"**************"}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full p-1 bg-white text-black opacity-50 "
                disabled
              />
            </label>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-lg font-medium text-white">
              Confirm Password
              <input
                type="password"
                value={"**************"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full p-1 bg-white text-black opacity-50"
                disabled
              />
            </label>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-lg font-medium text-white ">
              Gender
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-2 block w-full p-1 bg-white text-black"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-lg font-medium text-white">
              Phone Number
              <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2 block w-full p-1 bg-white text-black"
              />
            </label>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-4 px-6 rounded w-full"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfileScreen;
