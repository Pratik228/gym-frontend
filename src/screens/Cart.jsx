import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	UserIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Cart() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	console.log(cartItems);

	const addToCartHandler = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/login?redirect=/shipping");
	};

	return (
		<main>
			<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-0">
				<h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
					Shopping Cart
				</h1>

				{cartItems.length === 0 ? (
					<div className="text-center mt-8">
						<p className="text-xl font-semibold">
							Your cart is empty
							<a
								href="/"
								className="ml-2 text-blue-500 hover:underline">
								Go Back
							</a>
						</p>
					</div>
				) : (
					<form className="mt-12">
						<section aria-labelledby="cart-heading">
							<h2
								id="cart-heading"
								className="sr-only">
								Items in your shopping cart
							</h2>

							<ul
								role="list"
								className="divide-y divide-gray-200 border-t border-b border-gray-200">
								{cartItems.map((item) => (
									<li
										key={item.id}
										className="flex py-6 items-center justify-between">
										<div className="flex-shrink-0">
											<img
												src={item.image}
												alt={item.name}
												className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
											/>
										</div>

										<div className="ml-4 flex flex-1 flex-col sm:ml-6">
											<div className="flex justify-between items-center">
												<h4 className="text-sm">
													<a
														href={item.image}
														className="font-medium  hover:text-gray-300">
														{item.name}
													</a>
												</h4>
												<div className="flex items-center">
													<p className="text-sm font-medium">
														{Number(item.price)}
													</p>
													<p className="ml-4 text-sm text-gray-500">
														{item.color}
													</p>
												</div>
											</div>
											<div className="mt-4 flex justify-between items-end w-full">
												<div className="flex items-center">
													<label
														htmlFor={`quantity-${item.id}`}
														className="mr-2 text-sm font-medium">
														Qty:
													</label>
													<div className="relative">
														<select
															value={item.qty}
															onChange={(e) =>
																addToCartHandler(item, Number(e.target.value))
															}
															className="border rounded-lg bg-gray-500 px-4 py-2 text-lg">
															{[...Array(item.countInStock).keys()].map((x) => (
																<option
																	key={x + 1}
																	value={x + 1}>
																	{x + 1}
																</option>
															))}
															{/* </input> */}
														</select>
													</div>
												</div>
												<button
													type="button"
													className="ml-4 rounded-md border border-transparent bg-red-500 py-2 px-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
													onClick={() => removeFromCartHandler(item.id)}>
													Remove
												</button>
											</div>
										</div>
									</li>
								))}
							</ul>
						</section>

						{/* Order summary */}

						<section
							aria-labelledby="summary-heading"
							className="mt-10">
							<h2
								id="summary-heading"
								className="sr-only">
								Order summary
							</h2>

							<div>
								<dl className="space-y-4">
									<div className="flex items-center justify-between">
										<p className="text-2xl font-bold mb-4">Subtotal</p>
										<dd className="text-lg my-4">
											$
											{cartItems
												.reduce((acc, item) => acc + item.qty * item.price, 0)
												.toFixed(2)}
										</dd>
									</div>
								</dl>
								<p className="mt-1 text-sm text-gray-500">
									Shipping and taxes will be calculated at checkout.
								</p>
							</div>

							<div className="mt-10">
								<button
									onClick={checkoutHandler}
									type="submit"
									className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
									Proceed to Checkout
								</button>
							</div>
						</section>
					</form>
				)}
			</div>
		</main>
	);
}
