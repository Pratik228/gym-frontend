import React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Modal from "react-modal";
import {
  useGetIssuesQuery,
  useCloseIssueMutation,
} from "../slices/issuesApiSlice";

import { useSelector, useDispatch } from "react-redux";
import { showSnackbar } from "../slices/snackbarSlice";
import {
  useGetOrdersQuery,
  useCancelOrderMutation,
  useShipOrderMutation,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
const issues = [
  {
    id: 1,
    number: "1001",
    email: "user1@example.com",
    description: "Issue description 1",
    status: "Open",
  },
  {
    id: 2,
    number: "1002",
    email: "user2@example.com",
    description: "Issue description 2",
    status: "In Progress",
  },
  {
    id: 3,
    number: "1003",
    email: "user3@example.com",
    description: "Issue description 3",
    status: "Resolved",
  },
  // ... add more issues as needed
];

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

const CustomerService = () => {
  const { data: issues, isLoading, error } = useGetIssuesQuery();

  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const handleCloseIssue = async (issueId) => {
    try {
      await closeIssue(issueId).unwrap();
      // Handle success, e.g., show snackbar
    } catch (error) {
      // Handle error, e.g., show snackbar
    }
  };

  const openModal = (issue) => {
    setCurrentIssue(issue);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentIssue(null);
    setReplyMessage("");
  };

  const sendReply = () => {
    console.log(
      "Replying to issue:",
      currentIssue?.number,
      "with message:",
      replyMessage
    );
    // Here you can call an API to send the message
    closeModal(); // Close the modal after sending the message
  };

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
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Reply Message"
            style={customStyles}
          >
            <div className="p-4 bg-gray-700">
              <h2 className="text-lg font-semibold mb-4">
                Reply to Issue # {currentIssue?.number}
              </h2>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Message"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end gap-2">
                <button onClick={sendReply} className="btn-primary">
                  Send
                </button>
                <button onClick={closeModal} className="btn-primary">
                  Close
                </button>
              </div>
            </div>
          </Modal>

          {/* Orders List */}
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 w-1/6">
                    Reply
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      # {issue.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      {issue.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      {issue.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                      {issue.status}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <button
                        onClick={() => openModal(issue)}
                        className="text-blue-400 hover:text-blue-500 mr-2"
                      >
                        Reply
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

export default CustomerService;
