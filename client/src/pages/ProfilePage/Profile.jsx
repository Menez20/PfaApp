import React from 'react';
import Navbar from '../../components/profilepagecmp/NewNav';
import { Navigate } from 'react-router-dom';
// import { FaUserPlus, FaEyeSlash } from 'react-icons/fa';
// import Navbar from '../../components/profilepagecmp/Nav';

const isAuthenticated = () => {
  // Check if the user is authenticated (you might need to implement your own logic)
  return !!localStorage.getItem('token');
};
export const User = () => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='bg-[#f6f4eb]'>
      <Navbar />
    </div>
  );
};
