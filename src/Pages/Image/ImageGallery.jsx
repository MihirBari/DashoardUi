import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../config';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/prod/sendImage`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <>

    <div >
      <h1 style={{ textAlign: 'center', fontWeight:'500' }}>Product Images</h1>

      <div className="flex flex-row flex-wrap justify-start">
        {images.map((image) => (
          <Link to={`/product/${image.product_id}`} key={image.product_id}>
            <ProductImage product_image={image.image} product_id={image.product_id} />
          </Link>
        ))}
      </div>
    </div>

    </>
  );
};

const ProductImage = ({ product_image, product_id }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    try {
      // Convert base64 string to data URL
      setImageSrc(`data:image/jpeg;base64,${product_image}`);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }, [product_image]);

  return (
    <img
      src={imageSrc}
      alt={`Product ${product_id}`}
      style={{ width: '150px', height: '150px', margin: '10px' }}
    />
  );
};

export default ImageGallery;