import React, { useState } from "react";
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

function CustomerServiceScreen() {
	const [open, setOpen] = useState(false); // State to control the dialog/modal
	const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control snackbar
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = () => {
		// Simulate ticket generation (In a real app, integrate with backend)
		console.log("Ticket Generated:", formData);

		handleClose();
		setSnackbarOpen(true);
	};

	return (
		<div className="p-4">
			<div className="flex flex-row justify-between p-5">
				<h2 className="text-2xl mb-4">Your Orders</h2>
				<div>
					<p>Customer Service Email: xyz@minimalaura.com</p>
					<p>Customer Service Contact : +91 xxxx xxxxx </p>
				</div>
			</div>

			{/* List of Orders (for demo, using a static list) */}
			<List>
				<ListItem
					button
					onClick={handleOpen}>
					<ListItemText primary="Order #12345" />
				</ListItem>
				{/* <ListItem
					button
					onClick={handleOpen}>
					<ListItemText primary="Order #12345" />
				</ListItem>
				<ListItem
					button
					onClick={handleOpen}>
					<ListItemText primary="Order #12345" />
				</ListItem>
				<ListItem
					button
					onClick={handleOpen}>
					<ListItemText primary="Order #12345" />
				</ListItem> */}
				{/* ... add more list items for other orders */}
			</List>

			{/* Dialog/Modal for Order Issue Form */}
			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Describe your issue</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						margin="dense"
						label="Name"
						name="name"
						onChange={handleChange}
						value={formData.name}
					/>
					<TextField
						fullWidth
						margin="dense"
						label="Email"
						name="email"
						onChange={handleChange}
						value={formData.email}
					/>
					<TextField
						fullWidth
						margin="dense"
						label="Message"
						name="message"
						onChange={handleChange}
						value={formData.message}
						multiline
						rows={4}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary">
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>

			{/* Snackbar for successful ticket generation */}
			<Snackbar
				open={snackbarOpen}
				onClose={() => setSnackbarOpen(false)}
				message="Ticket generated successfully!"
				autoHideDuration={3000}
			/>
		</div>
	);
}

export default CustomerServiceScreen;
