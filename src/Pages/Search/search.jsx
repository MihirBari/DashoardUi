import React from 'react';
import AutoComplete from './autoComplete';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const history = useNavigate();

  const handleSelect = (productId) => {
    history(`/product/${productId}`);
  };

  return (
    <div>
      <h1 style={{textAlign:"center", fontSize:"35px", marginTop:"50px"}}>Product Search</h1>
      <AutoComplete onSelect={handleSelect} />
    </div>
  );
};

export default SearchPage;