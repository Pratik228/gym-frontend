import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

import { addToCart } from "../slices/cartSlice";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const ProductGrid = ({ products, addToCartHandler }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {products.map((product) => (
      <div
        key={product.id}
        className="flex flex-col h-full p-4 shadow-sm bg-[#1e293b] rounded"
      >
        <img
          src={product.image}
          alt={product.name}
          className="flex-grow object-cover h-48 mb-4"
        />
        <div className="flex-grow p-2">
          <h2 className="text-lg mb-2">{product.brand}</h2>
          <h2 className="text-lg mb-2">{product.name}</h2>
          <p className="text-md mb-2">${Number(product.price)}</p>
          <p className="text-sm leading-5 mb-4">{product.description}</p>
        </div>
        <div className="flex justify-end items-center gap-2">
          {/* items-center to vertically align the input and button */}
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            defaultValue="1"
            variant="outlined"
            size="small"
            className="mr-4" // Increase margin for more spacing
            id={`qty-${product.id}`}
          />
          <Button
            startIcon={<ShoppingCart />} // Add the shopping cart icon to the button
            onClick={() => {
              addToCartHandler(
                product,
                document.getElementById(`qty-${product.id}`).value
              );
              toast.success("Added items to cart successfully");
            }}
            variant="contained" // For filled button style
            color="primary" // Primary theme color
            size="medium" // Larger button size
          >
            Add to Cart
          </Button>
        </div>
      </div>
    ))}
  </div>
);

function ProductScreen() {
  const { data: products, isLoading, isError } = useGetProductsQuery(); // This replaces the useEffect call for fetching products

  console.log(products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  // Handle adding to cart
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty: parseInt(qty) }));
  };

  const handleFilter = () => {
    setSearchLoading(true); // start the search loading spinner
    let filtered = products;

    if (searchKeyword) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    setFilteredProducts(filtered);
    setSearchLoading(false); // end the search loading spinner
  };

  // // Handle filtering of products
  useEffect(() => {
    if (products) {
      let filtered = products;

      setFilteredProducts(filtered);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1>Error fetching products!</h1>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <div className="mb-4 flex justify-between gap-4">
          <TextField
            label="Search products"
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ flex: 2 }}
          />
          <FormControl variant="outlined" className="ml-2" style={{ flex: 1 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              <MenuItem value="men">Men's Wear</MenuItem>
              <MenuItem value="women">Women's Wear</MenuItem>
              <MenuItem value="kids">Kid's Wear</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleFilter}>
            Go
          </Button>
        </div>

        {searchLoading ? (
          <div className="flex justify-center items-center my-4">
            <Loader />
          </div>
        ) : filteredProducts.length === 0 ? (
          <Snackbar
            open={true}
            message="No products found!"
            autoHideDuration={3000}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            addToCartHandler={addToCartHandler}
          />
        )}
      </div>
      \
    </>
  );
}

export default ProductScreen;
