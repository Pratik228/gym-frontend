import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { DeleteForever } from "@mui/icons-material";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap mx-4">
        <div className="w-full md:w-8/12 px-4 mb-4 md:mb-0">
          <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <p className="text-lg font-semibold text-red-600">
              Your cart is empty{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Go Back
              </Link>
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 mb-4 flex items-center"
              >
                <div className="w-1/6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full rounded"
                  />
                </div>
                <div className="w-1/6 px-5">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-blue-600 hover:underline text-lg"
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="w-1/6 text-lg">${item.price}</div>
                <div className="w-1/6 px-5">
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                    className="border rounded-lg px-4 py-2 text-lg"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/6 text-lg">
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <DeleteForever />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-4/12 px-4">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            <p className="text-lg my-4">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
            <button
              className={`bg-blue-600 text-white px-5 py-3 rounded-lg text-lg ${
                cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
