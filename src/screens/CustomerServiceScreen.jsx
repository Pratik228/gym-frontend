import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { useCreateIssueMutation } from "../slices/issuesApiSlice";
import { showSnackbar } from "../slices/snackbarSlice";

Modal.setAppElement("#root");

function CustomerServiceScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [createIssue] = useCreateIssueMutation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    email: userInfo?.email || "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting issue:", formData);
      await createIssue(formData).unwrap();
      dispatch(showSnackbar({ message: "Issue raised successfully." }));
      closeModal();
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Error when raising an issue.",
          severity: "error",
        })
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Customer Service</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={openModal}
        >
          Reach Out via Email
        </button>
      </div>
      <div>
        <p>Customer Service Email: hello@minimal.io</p>
        <p>Customer Service Contact: +US xxxx xxxxx</p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-gray-800 rounded-lg p-5 mx-auto my-20 max-w-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30"
      >
        <h3 className="text-lg font-semibold mb-4">Describe your issue</h3>
        <form className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-800"
            placeholder="Issue Title"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-800"
            placeholder="Issue Description"
            rows="4"
          />
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-800"
            aria-label="Priority"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={userInfo?.email}
            className="w-full p-2 border rounded text-gray-800"
            placeholder="Your Email"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded bg-red-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CustomerServiceScreen;
