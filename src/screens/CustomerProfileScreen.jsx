import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { showSnackbar } from "../slices/snackbarSlice";

import Profile from "../components/Profile";
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

const CustomerProfileScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const {
    newAddress: address,
    handleInputChange,
    validationErrors,
    validateForm,
  } = useAddress();

  const dispatch = useDispatch();

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

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    dispatch(
      showSnackbar({
        message: "Address deleted successfully.",
        severity: "success",
      })
    );
  };

  return (
    <div className="flex justify-center bg-gray-900">
      <div className="w-4/5 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">User Profile</h2>
        <Profile />
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="relative bg-gray-800 p-4 w-full max-w-md max-h-full">
            <AddressForm
              title={
                currentAddress !== null ? "Edit Address" : "Add New Address"
              }
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

        <AddressList
          addresses={addresses}
          onEdit={openModal}
          onDelete={deleteAddress}
        />

        <button onClick={openModal} className="btn-primary mt-4">
          Add New Address
        </button>
      </div>
    </div>
  );
};

export default CustomerProfileScreen;
