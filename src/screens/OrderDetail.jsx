import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
	const { id } = useParams();
	const [orderDetails, setOrderDetails] = useState(null);

	useEffect(() => {
		setOrderDetails({
			paymentMethod: "Credit Card",
			address: "123 Main St, Anytown, AN 12345",
			finalAmount: "$128.00",
			status: "Shipped",
		});
	}, [id]);

	if (!orderDetails) {
		return <div className="text-center my-5">Loading...</div>;
	}

	return (
		<div className="container mx-auto mt-10 p-5  shadow-lg rounded-lg">
			<h1 className="text-2xl font-bold mb-5">Order Details: #{id}</h1>
			<div className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
				<p>{orderDetails.address}</p>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Payment Method</h2>
				<p>{orderDetails.paymentMethod}</p>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Final Amount</h2>
				<p>{orderDetails.finalAmount}</p>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Order Status</h2>
				<p className={`font-bold ${getStatusColor(orderDetails.status)}`}>
					{orderDetails.status}
				</p>
			</div>
		</div>
	);
};

const getStatusColor = (status) => {
	switch (status.toLowerCase()) {
		case "shipped":
			return "text-green-500";
		case "pending":
			return "text-yellow-500";
		case "cancelled":
			return "text-red-500";
		default:
			return "text-gray-500";
	}
};

export default OrderDetail;
