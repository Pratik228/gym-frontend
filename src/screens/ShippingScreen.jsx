import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import { showSnackbar } from "../slices/snackbarSlice";

import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../slices/cartSlice";
import AddressForm from "../components/AddressForm";
import AddressList from "../components/AddressList";
import useAddress from "../hooks/useAddress";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: 0,
    overflow: "visible",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const ShippingScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const {
    newAddress: address,
    handleInputChange,
    validationErrors,
    validateForm,
  } = useAddress();

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const selectedAddress = addresses[selectedAddressIndex];
    if (selectedAddress) {
      dispatch(
        saveShippingAddress({
          shippingAddress: selectedAddress,
        })
      );
      navigate("/payment");
    } else {
      dispatch(
        showSnackbar({
          message: "Please select a shipping address.",
          severity: "error",
        })
      );
    }
  };
  // const [sameAsShipping, setSameAsShipping] = useState(false);

  const openModal = (index = null) => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentAddress(null);
  };

  useEffect(() => {
    const savedAddresses = localStorage.getItem("userAddresses");

    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveAddress = () => {
    if (!validateForm()) return;

    let updatedAddresses;
    if (currentAddress !== null) {
      // Editing existing address
      updatedAddresses = addresses.map((a, index) =>
        index === currentAddress ? address : a
      );
    } else {
      // Adding new address
      updatedAddresses = [...addresses, address];
    }

    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    dispatch(
      showSnackbar({
        message: "Address saved successfully.",
        severity: "success",
      })
    );
    closeModal();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-0">
      <CheckoutSteps step1 step2 />
      <h1 className="text-xl font-bold mb-8">Shipping Information</h1>

      <div className="space-y-8 bg-gray-800 p-4 rounded-lg">
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-white mb-4">Your Addresses</h3>
          <ul>
            {addresses.map((address, index) => (
              <li
                key={index}
                className={`text-white mb-2 bg-gray-700 p-8 rounded-lg flex justify-between items-center hover:bg-gray-600 cursor-pointer ${
                  index === selectedAddressIndex ? "bg-blue-500" : ""
                }`}
                onClick={() => handleAddressSelect(index)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={index === selectedAddressIndex}
                    onChange={() => handleAddressSelect(index)}
                    className="form-checkbox h-5 w-5 text-gray-600 mr-2"
                  />
                  <div>
                    {address.address}, {address.city}, {address.country},{" "}
                    {address.state}, {address.postalCode}, {address.phone}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={openModal} className="btn-primary mt-4">
          Add New Address
        </button>
        <button
          onClick={submitHandler}
          className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-lg font-medium  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="relative bg-gray-800 p-4 w-full max-w-md max-h-full">
          <AddressForm
            title={currentAddress !== null ? "Edit Address" : "Add New Address"}
            newAddress={
              currentAddress !== null ? addresses[currentAddress] : address
            }
            handleInputChange={handleInputChange}
            validationErrors={validationErrors}
          />
          <div className="flex gap-2">
            <button onClick={saveAddress} className="btn-primary">
              Save
            </button>
            <button onClick={closeModal} className="btn-primary">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShippingScreen;
