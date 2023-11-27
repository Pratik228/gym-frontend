import React from "react";
import { Link } from "react-router-dom";

const CheckoutStep = ({ step, link, enabled, title }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs mb-1">{title}</div>
      {enabled ? (
        <Link to={link}>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center text-sm justify-center text-white">
            {step}
          </div>
        </Link>
      ) : (
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center text-sm justify-center text-gray-700">
          {step}
        </div>
      )}
    </div>
  );
};

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center mb-4">
      <CheckoutStep step={1} link="/cart" enabled={step1} title="Cart" />
      <div className="flex-auto border-t border-dashed border-gray-300"></div>
      <CheckoutStep step={2} link="/shipping" enabled={step2} title="Address" />
      <div className="flex-auto border-t border-dashed border-gray-300"></div>
      <CheckoutStep step={3} link="/payment" enabled={step3} title="Payment" />
    </div>
  );
};

export default CheckoutSteps;
