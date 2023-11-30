import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import AddressForm from "../components/AddressForm";
const defaultProfilePic = "https://loremflickr.com/640/360"; // Path to your default image
const CustomerProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(defaultProfilePic);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);

  // Separate state for each address field
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  // Load saved addresses from local storage
  useEffect(() => {
    const savedAddresses = localStorage.getItem("userAddresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const handleAddAddress = () => {
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    if (address && city && postalCode) {
      const newAddress = { address, city, country, state, postalCode, phone };
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
      setShowAddressModal(false);
      // Reset form fields
      setAddress("");
      setCity("");
      setCountry("");
      setState("");
      setPostalCode("");
      setPhone("");
      toast.success("Address saved successfully.");
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleSaveAddress = (newAddress) => {
    // Here you can also implement the logic to save the address to the backend
    setAddresses([...addresses, newAddress]);
    setShowAddressModal(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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

        <form className="mt-4 grid  gap-8">
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
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                country={country}
                setCountry={setCountry}
                state={state}
                setState={setState}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                phone={phone}
                setPhone={setPhone}
              />
              <button
                onClick={saveAddress}
                className="mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
