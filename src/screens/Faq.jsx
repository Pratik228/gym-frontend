// FAQ.js
import React from "react";

const FAQs = [
	{
		question: "How can I track my order?",
		answer:
			"You can track the status of your order by logging into your account and visiting the Orders section.",
	},
	{
		question: "What is the return policy?",
		answer:
			"We offer a 30-day return policy for unused products in their original packaging.",
	},
	{
		question: "How do I make changes to my order?",
		answer:
			"Please contact our customer service team as soon as possible to make changes to your order.",
	},
	// ... more FAQs
];

const Faq = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold text-center mb-8">
				Frequently Asked Questions
			</h1>
			<div className="space-y-4">
				{FAQs.map((faq, index) => (
					<div
						key={index}
						className="p-4 border border-gray-300 rounded-md shadow-sm">
						<h2 className="font-semibold text-lg">{faq.question}</h2>
						<p className="text-gray-600 mt-2">{faq.answer}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Faq;
