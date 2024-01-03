import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import img1 from "../assets/User.png"


const Logout = () => {
  const {  logout } = useContext(AuthContext)


  return (

      <div className='flex items-center'>
        <img src={img1} alt=''onClick={logout} className='mr-0' /> 
        <span className='logout' onClick={logout}></span>
      </div>

  );
}
export default Logout