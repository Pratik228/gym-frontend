import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";

import axios from "axios";

function CustomerServiceScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);
  const [open, setOpen] = useState(false); // For controlling the dialog/modal
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // Open the dialog
  const handleOpen = () => setOpen(true);

  // Close the dialog
  const handleClose = () => setOpen(false);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Simulate sending an API request to raise an issue
    try {
      handleClose();

      toast.success("Issue has been raised :)");
      const response = await axios.post(
        "http://localhost:5000/api/support/issue",
        formData
      );
    } catch (error) {
      console.error("Error when sending the issue:", error);
      toast.error("Somethin went wrong. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between p-5">
        <h2 className="text-2xl mb-4">Customer Service</h2>
        <Button variant="outlined" onClick={handleOpen}>
          Reach Out via Email
        </Button>
      </div>

      <div className="p-5">
        <p>Customer Service Email: hello@minimal.io</p>
        <p>Customer Service Contact: +US xxxx xxxxx </p>
      </div>

      {/* Dialog/Modal for raising an issue */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Describe your issue</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={userInfo?.name}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={userInfo?.email}
          />
          <TextField
            margin="dense"
            label="Message"
            name="message"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            onChange={handleChange}
            value={formData.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default CustomerServiceScreen;
