import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";

const MyOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log(orders);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Orders</h1>

      {orders.map((order) => (
        <NavLink
          key={order.id}
          to={`/orders/${order.id}`}
          className="py-4 block bg-gray-800 hover:bg-gray-700 rounded-lg mb-4"
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-2">
              Order ID: #{order.id}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-blue-400 hover:text-blue-500 font-medium">
                      {item.name}
                    </h3>
                    <p className="text-gray-300">Qty: {item.qty}</p>
                    <p className="text-orange-500 font-bold">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-green-600 font-bold">
                Status: {order.isDelivered ? "Delivered" : "Processing"}
              </p>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

// Place Order

//orders/:id -> Order Details Page render -> get Order

export default MyOrders;
