const AddressForm = ({
  title,
  newAddress,
  handleInputChange,
  validationErrors,
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor={`${title}-address`}
          >
            Address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`${title}-address`}
            type="text"
            name="address"
            placeholder="Address"
            value={newAddress.address}
            onChange={handleInputChange}
          />
          {validationErrors?.shippingAddress && (
            <p className="text-red-500 text-xs italic">
              {validationErrors.shippingAddress}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor={`${title}-city`}
          >
            City
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`${title}-city`}
            name="city"
            type="text"
            placeholder="City"
            value={newAddress.city}
            onChange={handleInputChange}
          />
          {validationErrors?.shippingCity && (
            <p className="text-red-500 text-xs italic">
              {validationErrors.shippingCity}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor={`${title}-country`}
          >
            Country
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`${title}-country`}
            type="text"
            placeholder="Country"
            name="country"
            value={newAddress.country}
            onChange={handleInputChange}
          />
          {validationErrors?.shippingCountry && (
            <p className="text-red-500 text-xs italic">
              {validationErrors.shippingCountry}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor={`${title}-state`}
          >
            State / Province
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`${title}-state`}
            type="text"
            placeholder="State"
            name="state"
            value={newAddress.state}
            onChange={handleInputChange}
          />
          {validationErrors?.shippingState && (
            <p className="text-red-500 text-xs italic">
              {validationErrors.shippingState}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor={`${title}-postalCode`}
          >
            Postal Code
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`${title}-postalCode`}
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={newAddress.postalCode}
            onChange={handleInputChange}
          />
          {validationErrors?.shippingPostalCode && (
            <p className="text-red-500 text-xs italic">
              {validationErrors.shippingPostalCode}
            </p>
          )}
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor={`${title}-phone`}
          >
            Phone
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`${title}-phone`}
            type="text"
            name="phone"
            placeholder="Phone"
            value={newAddress.phone}
            onChange={handleInputChange}
          />
          {validationErrors?.shippingPhone && (
            <p className="text-red-500 text-xs italic">
              {validationErrors.shippingPhone}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressForm;
