import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  // useEffect(() => {
  //   if (!cart.shippingAddress.address) {
  //     navigate('/shipping');
  //   } else if (!cart.paymentMethod) {
  //     navigate('/payment');
  //   }
  // }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/3 px-4 mb-6">
          {/* Shipping Address */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Shipping & Payment
            </h2>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Shipping
              </h3>
              <p className="text-gray-300">
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Payment Method
              </h3>
              <p className="text-gray-300">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-white mb-2">Order Items</h2>
            {cart.cartItems.map((item, index) => (
              <div key={index} className="border-b border-gray-700 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-400 hover:text-blue-500"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <span className="text-gray-300">
                    {item.qty} x ${Number(item.price).toFixed(2)} = $
                    {(item.qty * item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3 px-4">
          {/* Order Summary */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-2">Order Summary</h2>
            <div className="text-gray-300 mb-2">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Items</span>
                <span>${cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Shipping</span>
                <span>${cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Tax</span>
                <span>${cart.taxPrice}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Total</span>
                <span>${cart.totalPrice}</span>
              </div>
            </div>
            {error && <Message variant="danger">{error.data.message}</Message>}
            <button
              onClick={placeOrderHandler}
              disabled={cart.cartItems === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Place Order
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
