import React from 'react';
import { Spinner } from '@material-tailwind/react';
const LoadingPage = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center'>
      <Spinner color='white' className='text-black' />

      <p className=' text-center text-white text-xl font-semibold my-5'>
        Loading...
      </p>
      <p className='w-1/3 text-center text-white'>
        This may take a few seconds, please don't close this page.
      </p>
    </div>
  );
};

export default LoadingPage;
