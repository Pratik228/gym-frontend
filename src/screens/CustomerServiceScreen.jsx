import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";

import axios from "axios";

function CustomerServiceScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);
  const [open, setOpen] = useState(false); // For controlling the dialog/modal
  const [snackbarOpen, setSnackbarOpen] = useState(false); // For controlling snackbar
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Open the dialog
  const handleOpen = () => setOpen(true);

  // Close the dialog
  const handleClose = () => setOpen(false);

  // Close the snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Simulate sending an API request to raise an issue
    try {
      // Replace with your API endpoint
      const response = await axios.post(
        "http://localhost:5000/api/support/issue",
        formData
      );
      console.log(response.data);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error when sending the issue:", error);
    }
    handleClose();
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

      {/* Snackbar notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Issue has been raised. Our customer support will reach out to you as soon as possible."
      />
    </div>
  );
}

export default CustomerServiceScreen;
