import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import {
  LocalShipping,
  PaymentsOutlined,
  DoneAllOutlined,
  LocalShippingOutlined,
  AccessTime,
} from "@mui/icons-material";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: order, isLoading, isError } = useGetOrderDetailsQuery(id);

  if (isLoading) return <Loader />;
  if (isError || !order) return <div>Error fetching order details.</div>;

  console.log(order);

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

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <LocalShipping className="mr-2" />
                Billing :
              </h3>
              <p className="text-gray-300">
                <strong>Address:</strong> {order.billingAddress}
              </p>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
