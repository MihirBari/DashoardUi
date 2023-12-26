import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideNavBar from '../Sidebar/Navbar';
import EditableProductDetails from './EditableProductDetails';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

export const EditProduct = () => {
  const { currentUser } = useContext(AuthContext);
  const [product, setProduct] = useState({
    product_name: "",
    Description: "",
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0,
    xxxl: 0,
    xxxxl: 0,
    xxxxxl: 0,
    xxxxxxl: 0,
    product_price: "",
    Cost_price: "",
    other_cost:"",
    Final_cost:"",
    product_type: "",
  });

  const { product_id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (product_id) {
          const response = await axios.get(`${API_BASE_URL}/api/prod/Product/${product_id}`);
          const productData = response.data;

          setProduct({
            product_name: productData.product_name || "",
            Description: productData.Description || "",
            s: productData.s || 0,
            m: productData.m || 0,
            l: productData.l || 0,
            xl: productData.xl || 0,
            xxl: productData.xxl || 0,
            xxxl: productData.xxxl || 0,
            xxxxl: productData.xxxxl || 0,
            xxxxxl: productData.xxxxxl || 0,
            xxxxxxl: productData.xxxxxxl || 0,
            product_price: productData.product_price || "",
            Cost_price: productData.Cost_price || "",
            other_cost: productData.other_cost || "",
            Final_cost: productData.Final_cost || "",
            product_type: productData.product_type || "",
          });
        } else {
          console.error('Product ID is undefined');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [product_id]);

  const handleSave = async (editedProduct) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/prod/updateProduct/${product_id}`,
        { ...editedProduct, userId: currentUser },
      );

      console.log('Response from backend:', response.data);
      navigate("/product");
      toast.success('Edited completely');
      //console.log('Updated product:', editedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  console.log('Rendered with product:', product);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideNavBar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-center">Edit Product</h1>
          </div>

          {product && (
            <EditableProductDetails product={product} onSave={handleSave} />
          )}
        </div>
      </div>
    </>
  );
};
