import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: "1",
      status: "packed",
      productName: "Doctor Slippers flip flop",
      productImage:
        "https://m.media-amazon.com/images/I/61yngxfJPvL._SY575_.jpg",
    },
    {
      id: "2",
      status: "Dispatched",
      productName: "Designer Dress",
      productImage:
        "https://m.media-amazon.com/images/I/71eNvVzRiEL._SX679_.jpg",
    },
  ]);

  useEffect(() => {
    // Fetch orders from an API and set them in state
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Orders</h1>
      <div className="divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="py-4">
            <div className="flex flex-col md:flex-row justify-between  p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                {/* Product Image */}
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-32 h-32 object-cover rounded"
                />
                <div>
                  {/* Order Status */}
                  <p className="text-green-600 font-bold">
                    Delivered {order.deliveryDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    Package was handed to resident
                  </p>
                  {/* Product Name */}
                  <h3 className="text-lg font-medium">{order.productName}</h3>
                  <p classsName="text-gray-500 text-sm">
                    {order.productDescription}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                {/* Action Buttons */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Buy it again
                </button>
                <NavLink to={`/orders/${order.id}`}>
                  <button className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                    View your item
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Place Order

//orders/:id -> Order Details Page render -> get Order

export default MyOrders;
