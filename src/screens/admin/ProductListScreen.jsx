import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import { showSnackbar } from "../../slices/snackbarSlice";

import Modal from "react-modal";

Modal.setAppElement("#root");

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

const ProductFormModal = ({ product, showModal, closeModal, onSave }) => {
  console.log("Product", product);

  const [productData, setProductData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    image: product?.image || "",
    brand: product?.brand || "",
    category: product?.category || "",
    description: product?.description || "",
    rating: product?.rating || 0,
    numReviews: product?.numReviews || 0,
    price: product?.price || 0,
    countInStock: product?.countInStock || 0,
    createdAt: product?.createdAt || "",
    updatedAt: product?.updatedAt || "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    // Add validation logic for each field
    if (!productData.name) newErrors.name = "Name is required";
    if (!productData.image) newErrors.image = "Image URL is required";
    if (!productData.brand) newErrors.brand = "Brand is required";
    if (!productData.category) newErrors.category = "Category is required";
    if (!productData.description)
      newErrors.description = "Description is required";
    if (!productData.price) newErrors.price = "Price is required";
    if (!productData.countInStock)
      newErrors.countInStock = "Count In Stock is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Product data", productData);
      onSave(productData);
    }
  };

  return (
    <Modal isOpen={showModal} onRequestClose={closeModal} style={customStyles}>
      <div className="relative bg-gray-800 p-4 w-full max-w-md max-h-full">
        <h3 className="text-lg font-semibold text-white mb-4">
          Add New Product
        </h3>
        <form onSubmit={handleSubmit} className="-mx-3">
          <div className="grid grid-cols-2">
            {/* Name Field */}
            <div className="col-span-2 w-full px-3 mb-6">
              <label className=" block uppercase tracking-wide text-xs font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.name && (
                <p className="mt-2 text-red-500 text-xs italic">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Image Field */}
            <div className="col-span-2 w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={productData.image}
                onChange={handleInputChange}
                className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.image && (
                <p className="mt-2 text-red-500 text-xs italic">
                  {errors.image}
                </p>
              )}
            </div>

            {/* Brand Field */}
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
                className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.brand && (
                <p className="mt-2 text-red-500 text-xs italic">
                  {errors.brand}
                </p>
              )}
            </div>

            {/* Category Field */}
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.category && (
                <p className="mt-2 text-red-500 text-xs italic">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="col-span-2 w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.description && (
                <p className="mt-2 text-red-500 text-xs italic">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Price Field */}
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.price && (
                <p className="mt-2 text-red-500 text-xs italic">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Count In Stock Field */}
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Count In Stock
              </label>
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleInputChange}
                className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.countInStock && (
                <p className="mt-2 text-red-500 text-xs italic">
                  {errors.countInStock}
                </p>
              )}
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="w-full px-3 mb-6">
            <button type="submit" className="btn-primary mr-2">
              Save
            </button>
            <button onClick={closeModal} className="btn-primary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true); // Open the modal
    setProductToEdit(null); // Reset the product to edit
  };
  const closeModal = () => {
    setShowModal(false); // Close the modal
    setProductToEdit(null); // Reset the product to edit
  };

  const openEditModal = (product) => {
    setProductToEdit(product); // Set the product to edit
    setShowModal(true); // Open the modal
  };

  const handleSaveProduct = async (productData) => {
    try {
      const res = await createProduct(productData).unwrap();
      dispatch(
        showSnackbar({
          message: "Product created successfully",
          severity: "success",
        })
      );
      closeModal();
      refetch();
    } catch (err) {
      console.log(err);
      dispatch(
        showSnackbar({
          message: err?.data.message || "Error creating product",
          severity: "error",
        })
      );
    }
  };

  const handleUpdateProduct = async (productData) => {
    console.log("Product data", productData);
    try {
      const res = await updateProduct(productData).unwrap();
      dispatch(
        showSnackbar({
          message: "Product updated successfully",
          severity: "success",
        })
      );
      closeModal();
      refetch();
    } catch (err) {
      console.log(err);
      dispatch(
        showSnackbar({
          message: err?.data.message || "Error updating product",
          severity: "error",
        })
      );
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      refetch();
      dispatch(
        showSnackbar({
          message: "Product deleted successfully!",
          severity: "success",
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        showSnackbar({
          message: err?.data.message || "Error creating product",
          severity: "error",
        })
      );
    }
  };

  if (isLoading || isCreating) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-2">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4">
          <h1 className="text-xl font-semibold mb-4">Product Management</h1>
          <div className="flex mb-4">
            <button onClick={openModal} className="btn-primary">
              Add New Product
            </button>
          </div>
          <div className="bg-gray-800 shadow overflow-hidden rounded-lg mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Actions
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Reviews
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200">
                      Updated At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700 divide-y divide-gray-600">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {product.name}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {product.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {product.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {product.rating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {product.numReviews}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {product.countInStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white">
                        {new Date(product.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {!productToEdit && (
            <ProductFormModal
              showModal={showModal}
              closeModal={closeModal}
              onSave={handleSaveProduct}
            />
          )}

          {productToEdit && (
            <ProductFormModal
              product={productToEdit}
              showModal={showModal}
              closeModal={closeModal}
              onSave={handleUpdateProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListScreen;
