import React from 'react';
import { Nav } from '../../components/homecmp/Nav';
import { FaUserPlus, FaEyeSlash } from 'react-icons/fa';
// import Navbar from '../../components/profilepagecmp/Nav';

export const User = () => {
  return (
    <div className='grid grid-cols-12 grid-rows-9 gap-3'>
      <div className='col-span-10 col-start-2 row-start-1'>
        <Nav />
      </div>
      <div className='col-span-3 row-span-4 col-start-2 row-start-2 rounded-md bg-slate-500 flex'>
        {/* Avatar Picture */}
        <div className='flex items-center'>
          <img
            className='w-12 h-12 rounded-full'
            src='data:image/jpeg;base64,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'
            alt='Avatar'
          />
          {/* Name and Small Text */}
          <div className='ml-3'>
            <p className='text-white font-semibold'>John Doe</p>
            <p className='text-sm text-white'>Web Developer</p>
          </div>
        </div>
      </div>
      <div className='col-span-2 row-span-3 col-start-10 row-start-2 rounded-md bg-slate-500'>
        <FaEyeSlash />6
      </div>
      <div className='col-span-5 col-start-5 row-start-2 rounded-md bg-slate-500'>
        7 <FaUserPlus />
      </div>
      <div className='col-span-5 row-span-3 col-start-5 row-start-3 rounded-md bg-slate-500'>
        8
      </div>
      <div className='col-span-2 row-span-3 col-start-10 row-start-5 rounded-md bg-slate-500'>
        9
      </div>
    </div>
  );
};
