import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod, saveBillingAddress } from "../slices/cartSlice";
import AddressForm from "../components/AddressForm";
import useAddress from "../hooks/useAddress";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const {
    newAddress: billingAddress,
    handleInputChange,
    validationErrors,
    validateForm,
  } = useAddress();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Initially hide billing address form unless 'Card' is selected
    setShowBillingAddress(paymentMethod === "Card");
  }, [paymentMethod]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod === "Card" && !validateForm()) {
      // Validate billing address form if Card is selected
      return;
    }

    dispatch(savePaymentMethod(paymentMethod));

    if (paymentMethod === "Card") {
      // Save billing address for card payment
      dispatch(saveBillingAddress(billingAddress));
    }

    navigate("/placeorder");
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-0">
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-xl font-bold mb-8">Payment Information</h1>
      <form
        onSubmit={submitHandler}
        className="space-y-4 bg-gray-800 p-4 rounded-lg"
      >
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <input
                id="PayPal"
                name="paymentMethod"
                type="radio"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={() => setPaymentMethod("PayPal")}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="PayPal"
                className="ml-2 text-sm font-medium text-gray-300"
              >
                PayPal
              </label>
            </div>
            {paymentMethod === "PayPal" && (
              <div className="text-sm text-gray-300 ml-6">
                You will be redirected to PayPal's website to complete your
                purchase securely.
              </div>
            )}

            <div className="flex items-center">
              <input
                id="Card"
                name="paymentMethod"
                type="radio"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={() => setPaymentMethod("Card")}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="Card"
                className="ml-2 text-sm font-medium text-gray-300"
              >
                Credit/Debit Card
              </label>
            </div>
            {paymentMethod === "Card" && (
              <div className="text-sm text-gray-300 ml-6 space-y-4 mb-2">
                <div>Enter your card details to proceed with the payment:</div>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                {showBillingAddress && (
                  <div className="mt-6">
                    <AddressForm
                      title="Billing Address"
                      newAddress={billingAddress}
                      handleInputChange={handleInputChange}
                      validationErrors={validationErrors}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center">
              <input
                id="Cash"
                name="paymentMethod"
                type="radio"
                value="Cash"
                checked={paymentMethod === "Cash"}
                onChange={() => setPaymentMethod("Cash")}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="Cash"
                className="ml-2 text-sm font-medium text-gray-300"
              >
                Cash on Delivery
              </label>
            </div>
            {paymentMethod === "Cash" && (
              <div className="text-sm text-gray-300 ml-6">
                Pay with cash upon delivery.
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreen;
