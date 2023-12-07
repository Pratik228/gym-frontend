import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "react-modal";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";

import { showSnackbar } from "../slices/snackbarSlice";
import { useDispatch } from "react-redux";
import {
  useGetOrderDetailsQuery,
  useCancelOrderMutation,
  useSubmitFeedbackMutation,
} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import {
  LocalShipping,
  PaymentsOutlined,
  DoneAllOutlined,
  LocalShippingOutlined,
  AccessTime,
} from "@mui/icons-material";

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

// Function to render star rating
const renderStarRating = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} style={{ color: "yellow" }} />);
    } else if (i - 1 < rating && i > rating) {
      stars.push(<StarHalf key={i} style={{ color: "yellow" }} />);
    } else {
      stars.push(<StarBorder key={i} style={{ color: "yellow" }} />);
    }
  }
  return stars;
};

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 0, description: "" });

  const [submitFeedback] = useSubmitFeedbackMutation();

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useGetOrderDetailsQuery(id);

  console.log(order);

  const [cancelOrder] = useCancelOrderMutation();

  if (isLoading) return <Loader />;
  if (isError || !order) return <div>Error fetching order details.</div>;

  // Function to handle order cancellation
  const handleCancelOrder = async () => {
    try {
      const res = await cancelOrder(id).unwrap();

      dispatch(
        showSnackbar({
          message: "Order cancelled successfully!",
          severity: "success",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({
          message: "Error cancelling order.",
          severity: "error",
        })
      );
    }
  };

  // Handle feedback submit
  const handleFeedbackSubmit = async () => {
    console.log(feedback);

    try {
      await submitFeedback({ orderId: order.id, feedback }).unwrap();
      dispatch(showSnackbar({ message: "Feedback submitted successfully!" }));
      refetch();
      setShowFeedbackModal(false);
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Error submitting feedback." }));
    }
  };

  const canCancelOrder = ["Placed", "Shipped"].includes(order.orderStatus);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4">
          {/* Combined Shipping, Payment, Order Items, and Order Summary */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              Order Details (ID: {order.id})
            </h2>
            {/* Shipping Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <LocalShipping className="mr-2" />
                Shipping
              </h3>
              <p className="text-gray-300">
                <strong>Address:</strong> {order.shippingAddress}
              </p>
            </div>
            {/* Shipping Information */}
            {order.paymentMethod === "Card" && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <LocalShipping className="mr-2" />
                  Billing
                </h3>
                <p className="text-gray-300">
                  <strong>Address:</strong> {order.billingAddress}
                </p>
              </div>
            )}
            {/* Order Status */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <DoneAllOutlined className="mr-2" />
                Order Status
              </h3>
              <p className="text-gray-300">
                <strong>Status: </strong>
                <span className="text-yellow-400">{order.orderStatus}</span>
              </p>
            </div>
            {/* Payment Method */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <PaymentsOutlined className="mr-2" />
                Payment Method
              </h3>
              <p className="text-yellow-400">
                <strong>Method:</strong> {order.paymentMethod}
              </p>
            </div>
            {/* Order Items */}
            <h2 className="text-xl font-bold text-white mb-2">Order Items</h2>
            {order.orderItems.map((item, index) => (
              <div key={index} className="border-b border-gray-700 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded"
                    />
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-blue-400 hover:text-blue-500"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <span className="text-orange-400">
                    {item.qty} x ${Number(item.price).toFixed(2)} = $
                    {(item.qty * item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            {/* Order Summary */}
            <h2 className="text-xl font-bold text-white mt-4 mb-2">
              Order Summary
            </h2>
            <div className="text-gray-300 mb-2">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Items</span>
                <span className="text-orange-400">
                  ${Number(order.itemsPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Shipping</span>
                <span className="text-orange-400">
                  ${Number(order.shippingPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Tax</span>
                <span className="text-orange-400">
                  ${Number(order.taxPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Total</span>
                <span className="text-orange-400">
                  ${Number(order.totalPrice).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Feedback Section */}
            {order.orderStatus === "Delivered" &&
              (order.feedbackRating || order.feedbackDescription) && (
                <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Feedback
                  </h3>
                  <div className="text-gray-300 mb-2">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">Rating:</span>
                      <div className="flex">
                        {renderStarRating(order.feedbackRating)}
                      </div>
                    </div>
                    <div>
                      <span className="mr-2">Description:</span>
                      <p>{order.feedbackDescription}</p>
                    </div>
                  </div>
                </div>
              )}
            {canCancelOrder && (
              <button
                onClick={handleCancelOrder}
                className="mt-4 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Cancel Order
              </button>
            )}

            {/* Feedback */}
            {order.orderStatus === "Delivered" && (
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="mt-4 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                {order.feedbackRating ? "Edit Feedback" : "Add Feedback"}
              </button>
            )}

            <Modal
              isOpen={showFeedbackModal}
              style={customStyles}
              onRequestClose={() => setShowFeedbackModal(false)}
            >
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Add Feedback
                </h3>
                <div className="mb-4">
                  <label className="text-white mb-2">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={feedback.rating}
                    onChange={(e) =>
                      setFeedback({ ...feedback, rating: e.target.value })
                    }
                    className="w-full text-gray-700 rounded py-2 px-4"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-white mb-2">Description</label>
                  <textarea
                    value={feedback.description}
                    onChange={(e) =>
                      setFeedback({ ...feedback, description: e.target.value })
                    }
                    className="w-full text-gray-700  rounded py-2 px-4"
                  />
                </div>
                <button
                  onClick={handleFeedbackSubmit}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Submit Feedback
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
