import React from 'react';
import Navbar from '../../components/profilepagecmp/NewNav';
import UserWidget from '../../components/profilepagecmp/UserWidgetSide';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

const isAuthenticated = () => {
  // Check if the user is authenticated (you might need to implement your own logic)
  return !!localStorage.getItem('token');
};
export const User = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = localStorage.getItem('token');
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }
  return (
    <Box className='bg-[#f6f4eb]'>
      <Navbar />
      {/* <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='2rem'
        justifyContent='center'>
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m='2rem 0' />
        </Box>
      </Box> */}
    </Box>
  );
};
