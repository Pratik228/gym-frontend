import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { FaTimes, FaUpload } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
// import { useProfileMutation } from "../slices/usersApiSlice";
// import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
// import { setCredentials } from "../slices/authSlice";
import { BASE_URL, USERS_URL } from "../constants";
import AddressForm from "../components/AddressForm";
const defaultProfilePic = "https://loremflickr.com/640/360"; // Path to your default image
const CustomerProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState(defaultProfilePic);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    phone: "",
  });
  useEffect(() => {
    const savedAddresses = localStorage.getItem("userAddresses");
    console.log(savedAddresses);
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const saveAddress = () => {
    const newAddress = {
      address: "", // Fill these with actual data
      city: "",
      country: "",
      state: "",
      postalCode: "",
      phone: "",
    };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    console.log(updatedAddresses);
    setShowAddressModal(false);
  };

  const handleAddAddress = () => {
    setShowAddressModal(true);
  };

  const handleAddressChange = (field, value) => {
    setNewAddress({ ...newAddress, [field]: value });
  };

  const handleSaveAddress = (newAddress) => {
    // Here you can also implement the logic to save the address to the backend
    setAddresses([...addresses, newAddress]);
    setShowAddressModal(false);
  };

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

        <form onSubmit={submitHandler} className="mt-4 grid  gap-8">
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
              Phone
              <input
                type="phone"
                value={userInfo?.phone}
                className="mt-2 block w-full p-1 bg-white text-black opacity-50 "
                disa
              />
            </label>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddAddress}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Address
            </button>
          </div>

          {showAddressModal && (
            <>
              <AddressForm
                title="Add New Address"
                address={newAddress.address}
                setAddress={(value) => handleAddressChange("address", value)}
                city={newAddress.city}
                setCity={(value) => handleAddressChange("city", value)}
                country={newAddress.country}
                setCountry={(value) => handleAddressChange("country", value)}
                state={newAddress.state}
                setState={(value) => handleAddressChange("state", value)}
                postalCode={newAddress.postalCode}
                setPostalCode={(value) =>
                  handleAddressChange("postalCode", value)
                }
                phone={newAddress.phone}
                setPhone={(value) => handleAddressChange("phone", value)}
                validation={null}
              />

              <button
                onClick={saveAddress}
                className="mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save Address
              </button>
            </>
          )}
        </form>

        <div className="mt-6">
          <h3 className="text-2xl font-bold text-white mb-4">
            Your Addresses:
          </h3>
          <ul>
            {addresses?.map((address, index) => (
              <li key={index} className="text-white mb-2">
                {/* Display address details */}
                {address.address}, {address.city}, {address.country},
                {address.state}, {address.postalCode}, {address.phone}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileScreen;
