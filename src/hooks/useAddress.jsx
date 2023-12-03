import { useState } from "react";

const useAddress = () => {
  const [newAddress, setAddress] = useState({
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    phone: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [sameAsShipping, setSameAsShipping] = useState(true); // If you have a billing address logic

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    // Validations for shipping address
    if (!newAddress.address)
      errors.shippingAddress = "Shipping address is required";
    if (!newAddress.city) errors.shippingCity = "City is required";
    if (!newAddress.country) errors.shippingCountry = "Country is required";
    if (!newAddress.state) errors.shippingState = "State is required";
    if (!newAddress.postalCode)
      errors.shippingPostalCode = "Postal code is required";
    if (!newAddress.phone) errors.shippingPhone = "Phone number is required";

    // Validations for billing address (only if different from shipping)
    if (!sameAsShipping) {
      if (!billingAddress.address)
        errors.billingAddress = "Billing address is required";
      if (!billingAddress.city) errors.billingCity = "City is required";
      if (!billingAddress.country)
        errors.billingCountry = "Country is required";
      if (!billingAddress.state) errors.billingState = "State is required";
      if (!billingAddress.postalCode)
        errors.billingPostalCode = "Postal code is required";
      if (!billingAddress.phone)
        errors.billingPhone = "Phone number is required";
    }

    console.log("errors", errors);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    newAddress,
    setAddress,
    handleInputChange,
    validationErrors,
    validateForm,
  };
};

export default useAddress;
