import React from 'react';
import SideNavBar from '../Sidebar/Navbar';
import Maiin from './maiin';  // Assuming that 'maiin' is a component and not a typo

const Dashboard = () => {
  return (
    <div className="flex">
      <SideNavBar />
      <div className="flex-1  p-6">
        <Maiin />
      </div>
    </div>
  );
}

export default Dashboard;