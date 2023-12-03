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
  const cart = useSelector((state) => state.cart);
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const {
    newAddress: address,
    handleInputChange,
    validationErrors,
    validateForm,
  } = useAddress();

  const [sameAsShipping, setSameAsShipping] = useState(false);

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

  const submitHandler = (e) => {
    dispatch(
      saveShippingAddress({
        shippingAddress: address,
        // billingAddress: sameAsShipping ? null : billingAddress,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-0">
      <CheckoutSteps step1 step2 />
      <h1 className="text-xl font-bold mb-8">Shipping Information</h1>

      <div className="space-y-8 bg-gray-800 p-4 rounded-lg">
        <AddressList
          addresses={addresses}
          onEdit={openModal}
          onDelete={deleteAddress}
        />
        <button onClick={openModal} className="btn-primary mt-4">
          Add New Address
        </button>
        <form onSubmit={submitHandler}>
          {/* Billing Address */}
          <div className="mb-6">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
              Billing Address
            </label>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
              />

              <span className="ml-2 text-gray-400">
                Same as shipping address
              </span>
            </label>
          </div>
          <button
            onClick={submitHandler}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-lg font-medium  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </form>
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
