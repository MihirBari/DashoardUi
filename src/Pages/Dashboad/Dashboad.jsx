import React from 'react';
import SideNavBar from '../Sidebar/Navbar';
import Main from './maiin';

const Dashboard = () => {
  return (
    <div className="flex">
      <SideNavBar />
      <div className="flex-1 p-6 "> 
        <Main />
      </div>
    </div>
  );
}

export default Dashboard;
