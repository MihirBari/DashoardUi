import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import img1 from "../assets/User.png"

import { Link } from 'react-router-dom';

const Logout = () => {
  const {  logout } = useContext(AuthContext)


  return (
    <Link to='/'>
      <div className='flex items-center'>
        <img src={img1} alt='' className='mr-0' /> {/* Add mr-0 class to remove margin */}
        <span className='logout' onClick={logout}></span>
      </div>
    </Link>
  );
}
export default Logout