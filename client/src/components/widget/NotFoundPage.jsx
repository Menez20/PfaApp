import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  return (
    <div className='bg-transparent relative overflow-hidden h-screen'>
      {' '}
      <img
        src='https://img.freepik.com/premium-photo/clean-futuristic-gallery-interior-with-mock-up-place-3d-rendering_670147-10215.jpg'
        className='absolute h-full w-full object-fill'
        alt='Bg'
      />
      <div className='inset-0 bg-black opacity-25 absolute'></div>{' '}
      <div className='container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40'>
        {' '}
        <div className='w-full font-mono flex flex-col items-center relative z-10'>
          {' '}
          <h1 className='font-extrabold text-5xl text-center text-white leading-tight mt-4'>
            You are all alone here{' '}
          </h1>{' '}
          <p className='font-extrabold text-8xl my-36 text-white animate-bounce'>
            404{' '}
          </p>{' '}
          <button
            className='font-extrabold text-5xl  text-white animate-bounce'
            onClick={() => {
              navigate(`/profile/${user._id}`);
            }}>
            <span>
              <ArrowBack /> Go Back{' '}
            </span>
          </button>
        </div>{' '}
      </div>
    </div>
  );
};

export default NotFound;
