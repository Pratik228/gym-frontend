import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showSnackbar } from "../../slices/snackbarSlice";
import {
  useGetOrdersQuery,
  useCancelOrderMutation,
  useShipOrderMutation,
  useDeliverOrderMutation,
} from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();
  const [shipOrder] = useShipOrderMutation();
  const [deliverOrder] = useDeliverOrderMutation();
  const dispatch = useDispatch();
  // const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const handleStatusChange = async (orderId, newStatus) => {
    console.log(orderId, newStatus);
    try {
      if (newStatus === "Cancelled") {
        await cancelOrder(orderId).unwrap();
      } else if (newStatus === "Shipped") {
        await shipOrder(orderId).unwrap();
      } else if (newStatus === "Delivered") {
        await deliverOrder(orderId).unwrap();
      }
      dispatch(
        showSnackbar({
          message: `Order ${newStatus.toLowerCase()} successfully.`,
          severity: "success",
        })
      );
      refetch();
    } catch (err) {
      dispatch(
        showSnackbar({
          message: err.data ? err.data.message : "Error updating order status",
          severity: "error",
        })
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4">
          <h1 className="text-xl font-semibold mb-4">Order Management</h1>

          {/* Orders List */}
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      {order.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      ${order.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      {order.orderStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <button
                        onClick={() => handleStatusChange(order.id, "Shipped")}
                        className="text-blue-400 hover:text-blue-500 mr-2"
                      >
                        Ship
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(order.id, "Delivered")
                        }
                        className="text-green-400 hover:text-green-500 mr-2"
                      >
                        Deliver
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(order.id, "Cancelled")
                        }
                        className="text-red-400 hover:text-red-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListScreen;
