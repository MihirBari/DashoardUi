import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API_BASE_URL from "../../config";
import { toast } from "react-toastify";
import axios from "axios";

const EditableOrderDetails = ({ product, productId, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [productTypes, setProductTypes] = useState();
  

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = (e) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    let updatedProduct = { ...editedProduct, [e.target.name]: value };

    // If the changed input is the 'status' field, set it directly
    if (e.target.name === "status") {
      updatedProduct = { ...updatedProduct, status: e.target.value };
    }

    // Recalculate Final_cost if either Cost_price or other_cost changes
    if (e.target.name === "Cost_price" || e.target.name === "other_cost") {
      const costPrice = +updatedProduct.Cost_price || 0;
        const otherCost = +updatedProduct.other_cost || 0;
        updatedProduct.Final_cost = costPrice + otherCost;
    }

    setEditedProduct(updatedProduct);
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/prod/productType`);
      setProductTypes(response.data);
    } catch (error) {
      console.error("Error fetching product types:", error.message);
    }
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

    try {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/prod/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Update the product with the new image information
        const imagePaths = response.data.imagePaths;

        setEditedProduct((prev) => ({
          ...prev,
          product_image: imagePaths,
        }));
        toast.success("Image uploaded successfully");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image: " + error.message);
    }
  };

  const handleSaveClick = () => {
    // Convert relevant fields to numbers
    const formattedData = {
      data: [
        {
          ...editedProduct,
          s: Number(editedProduct.s),
          m: Number(editedProduct.m),
          l: Number(editedProduct.l),
          xl: Number(editedProduct.xl),
          xxl: Number(editedProduct.xxl),
          xxxl: Number(editedProduct.xxxl),
          xxxxl: Number(editedProduct.xxxxl),
          xxxxxl: Number(editedProduct.xxxxxl),
          xxxxxxl: Number(editedProduct.xxxxxxl),
          Cost_price: Number(editedProduct.Cost_price),
          product_price: Number(editedProduct.product_price),
          other_cost: Number(editedProduct.other_cost),
          Final_cost: Number(editedProduct.Final_cost),
        },
      ],
    };

    onSave(formattedData);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name:
              </label>
              <input
                type="text"
                name="product_name"
                value={editedProduct.product_name}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <input
                type="text"
                name="Description"
                value={editedProduct.Description}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                S:
              </label>
              <input
                type="number"
                name="s"
                value={editedProduct.s}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                M:
              </label>
              <input
                type="number"
                name="m"
                value={editedProduct.m}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                L:
              </label>
              <input
                type="number"
                name="l"
                value={editedProduct.l}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                XL:
              </label>
              <input
                type="number"
                name="xl"
                value={editedProduct.xl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                2XL:
              </label>
              <input
                type="number"
                name="xxl"
                value={editedProduct.xxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                3XL:
              </label>
              <input
                type="number"
                name="xxxl"
                value={editedProduct.xxxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                4XL:
              </label>
              <input
                type="number"
                name="xxxxl"
                value={editedProduct.xxxxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                5XL:
              </label>
              <input
                type="number"
                name="xxxxxl"
                value={editedProduct.xxxxxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                6XL:
              </label>
              <input
                type="number"
                name="xxxxxxl"
                value={editedProduct.xxxxxxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Price:
              </label>
              <input
                type="number"
                name="product_price"
                value={editedProduct.product_price}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cost Price:
              </label>
              <input
                type="number"
                name="Cost_price"
                value={editedProduct.Cost_price}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Other Cost Price
              </label>
              <input
                type="number"
                name="other_cost"
                value={editedProduct.other_cost}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Final cost price:
              </label>
              <input
                type="number"
                name="Final_cost"
                value={editedProduct.Final_cost}
                readOnly
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Type:
              </label>
              <input
                type="text"
                name="product_type"
                value={editedProduct.product_type}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status :
              </label>
              <select
                name="status"
                required
                onChange={handleInputChange}
                value={editedProduct.status} // Set the value attribute here
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" selected disabled>
                  Select Option
                </option>
                <option value="Active">Active</option>
                <option value="Close">Close</option>
                <option value="upcoming">upcoming</option>
                <option value="Draft">Draft</option>
                <option value="InActive">InActive</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="product_image"
                className="block text-sm font-medium text-gray-700"
              >
                Product Images
              </label>
              <div className="mt-1 relative">
                <input
                  type="file"
                  name="product_image"
                  onChange={(e) => handleImageChange(e)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  multiple
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleSaveClick}
              className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Save
            </button>
            <Link to={`/search/${productId}`}>
              <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditableOrderDetails;
