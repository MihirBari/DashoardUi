import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../config';
import FilterModal from './FilterModal';
import { CiFilter } from 'react-icons/ci';

const ImageGallery = () => {
  const [productData, setProductData] = useState([]);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    productName: "",
    productType: "",
    status: "",
    costPriceMin: "",
    costPriceMax: "",
    dateFilterType: "",
    selectedDate: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/prod/sendImage`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching image data:', error);
      });
  }, []);

  const handleCiFilterClick = () => {
    setFilterModalIsOpen(true);
  };

  const onApplyFilters = (filteredData) => {
    // Set the filteredUsers state with the data received from the backend
    setFilteredUsers(filteredData);

    // Close the filter modal
    setFilterModalIsOpen(false);
  };

  const initialFilters = {
    productName: "",
    productType: "",
    status: "",
    costPriceMin: "",
    costPriceMax: "",
    dateFilterType: "",
    selectedDate: "",
    startDate: "",
    endDate: "",
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center', fontSize: "25px", fontWeight: '450', marginTop: '15px' }}>Product Images</h1>
        <CiFilter
          size={40}
          style={{ marginLeft: "25px" }}
          onClick={handleCiFilterClick}
        />
        <FilterModal
          isOpen={filterModalIsOpen}
          onClose={() => setFilterModalIsOpen(false)}
          onApplyFilters={onApplyFilters}
          filters={filters}
          resetFilters={() => setFilters(initialFilters)}
        />
        <div className="flex flex-row flex-wrap justify-start">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(({ publicId, productId }, index) => (
              <Link to={`/Search/${productId}`} key={index}>
                <CloudinaryImage publicId={publicId} />
              </Link>
            ))
          ) : (
            productData.map(({ publicId, productId }, index) => (
              <Link to={`/Search/${productId}`} key={index}>
                <CloudinaryImage publicId={publicId} />
              </Link>
            ))
          )}
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
