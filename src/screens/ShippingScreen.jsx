import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../slices/cartSlice";
import AddressForm from "../components/AddressForm";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [state, setState] = useState(shippingAddress.state || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [billingAddress, setBillingAddress] = useState({ ...shippingAddress });

  const [validationErrors, setValidationErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!country) errors.country = "Country is required";
    if (!state) errors.state = "State is required";
    if (!postalCode) errors.postalCode = "Postal code is required";
    if (!phone) errors.phone = "Phone number is required";

    return errors;
  };
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress({
        address,
        city,
        country,
        state,
        postalCode,
        phone,
      });
    }
  }, [sameAsShipping, address, city, country, state, postalCode, phone]);

  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      dispatch(
        saveShippingAddress({
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
            state,
            phone,
          },
          billingAddress: sameAsShipping ? null : billingAddress,
        })
      );
      navigate("/payment");
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-0">
      <CheckoutSteps step1 step2 />
      <h1 className="text-xl font-bold mb-8">Shipping Information</h1>
      <form
        onSubmit={submitHandler}
        className="space-y-8 bg-gray-800 p-4 rounded-lg"
      >
        <AddressForm
          title="Shipping Address"
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
          validation={
            validationErrors.address && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.address}
              </p>
            )
          }
        />

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

            <span className="ml-2 text-gray-400">Same as shipping address</span>
          </label>
        </div>

        {!sameAsShipping && (
          <AddressForm
            title="Billing Address"
            address={billingAddress.address}
            setAddress={(val) =>
              setBillingAddress({ ...billingAddress, address: val })
            }
            city={billingAddress.city}
            setCity={(val) =>
              setBillingAddress({ ...billingAddress, city: val })
            }
            country={billingAddress.country}
            setCountry={(val) =>
              setBillingAddress({ ...billingAddress, country: val })
            }
            state={billingAddress.state}
            setState={(val) =>
              setBillingAddress({ ...billingAddress, state: val })
            }
            postalCode={billingAddress.postalCode}
            setPostalCode={(val) =>
              setBillingAddress({ ...billingAddress, postalCode: val })
            }
            phone={billingAddress.phone}
            setPhone={(val) =>
              setBillingAddress({ ...billingAddress, phone: val })
            }
            validation={
              validationErrors.address && (
                <p className="text-red-500 text-xs italic">
                  {validationErrors.address}
                </p>
              )
            }
          />
        )}

        <button
          onClick={submitHandler}
          className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-lg font-medium  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
