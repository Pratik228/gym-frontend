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

const issues = [
	{
		title: "Issue 1",
		email: "user1@example.com",
		reply: "Reply 1",
		status: "Open",
		additionalInfo: "Info 1",
	},
	{
		title: "Issue 2",
		email: "user2@example.com",
		reply: "Reply 2",
		status: "Closed",
		additionalInfo: "Info 2",
	},
];

const CustomerService = () => {
	const getStatusStyle = (status) => {
		switch (status.toLowerCase()) {
			case "open":
				return "text-red-500 font-semibold";
			case "closed":
				return "text-green-500 font-semibold";
			default:
				return "text-gray-500 font-semibold";
		}
	};
	const [showModal, setShowModal] = useState(false);
	const openModal = (index = null) => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setCurrentAddress(null);
	};

	const onClickHandler = () => {};
	return (
		<div>
			<TableContainer className="m-4 border border-gray-200 max-w-full">
				<Table className="min-w-full divide-y divide-gray-200">
					<thead>
						<TableRow>
							<TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Issue
							</TableCell>
							<TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Email
							</TableCell>
							<TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Reply
							</TableCell>
							<TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</TableCell>
							<TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Additional Column
							</TableCell>
						</TableRow>
					</thead>
					<TableBody className="divide-y divide-gray-200">
						{issues.map((issue, index) => (
							<TableRow key={index}>
								<TableCell className="px-6 py-4 whitespace-nowrap">
									{issue.title}
								</TableCell>
								<TableCell className="px-6 py-4 whitespace-nowrap">
									{issue.email}
								</TableCell>
								<TableCell className="px-6 py-4 whitespace-nowrap">
									<button
										className="text-indigo-600 hover:text-indigo-900"
										onClick={openModal}>
										Reply
									</button>
								</TableCell>
								<TableCell
									className={`px-6 py-4 whitespace-nowrap ${getStatusStyle(
										issue.status
									)}`}>
									{issue.status}
								</TableCell>
								<TableCell className="px-6 py-4 whitespace-nowrap">
									{issue.additionalInfo}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal
				isOpen={showModal}
				onRequestClose={closeModal}>
				<div className="relative bg-gray-800 p-4 max-h-full">
					<h3 className="text-lg font-semibold text-white mb-4">
						Reply to the email
					</h3>
					<div className="flex flex-wrap mx-3 mb-6">
						<div className="w-full  px-3 mb-6">
							<label className="block uppercase tracking-wide text-xs font-bold mb-2">
								Issue ID
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								name="issue"
								type="text"
								placeholder="Issue #"
							/>
						</div>
						<div className="w-full px-3 mb-6">
							<label className="block uppercase tracking-wide text-xs font-bold mb-2">
								Email
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="email"
								type="text"
								placeholder="john@example.com"
							/>
						</div>
						<div className="w-full  px-3 mb-6">
							<label className="block uppercase tracking-wide text-xs font-bold mb-2">
								Message
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								name="message"
								type="text"
								placeholder="Write your message here"
							/>
						</div>
					</div>
				</div>

				<div className="relative bg-gray-800 p-4 w-full max-h-full">
					<div className="flex gap-2">
						<button className="btn-primary">Save</button>
						<button
							onClick={closeModal}
							className="btn-primary">
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default CustomerService;
