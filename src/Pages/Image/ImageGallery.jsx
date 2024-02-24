import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../config';

const ImageGallery = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/prod/sendImage`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching image data:', error);
      });
  }, []);

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center', fontSize: "25px", fontWeight: '450', marginTop: '15px' }}>Product Images</h1>

        <div className="flex flex-row flex-wrap justify-start">
          {productData.map(({ publicId, productId }, index) => (
            <Link to={`/Search/${productId}`} key={index}>
              <CloudinaryImage publicId={publicId} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

const CloudinaryImage = ({ publicId }) => {
  const cloudinaryUrl = `https://res.cloudinary.com/dgcxd0kkk/image/upload/${publicId}`;

  return (
    <img
      src={cloudinaryUrl}
      alt={`Product ${publicId}`}
      style={{ width: '300px', height: '300px', margin: '10px', cursor: 'pointer' }}
      loading="lazy" 
    />
  );
};

export default ImageGallery;
