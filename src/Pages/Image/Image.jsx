import React from 'react';
import SideNavBar from '../Sidebar/Navbar'; 
import ImageGallery from './ImageGallery';

const Image = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavBar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <ImageGallery />
      </div>
    </div>
  );
}

export default Image;