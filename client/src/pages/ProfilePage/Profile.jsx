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
        <img
          src='https://st3.depositphotos.com/3431221/13621/v/450/depositphotos_136216036-stock-illustration-man-avatar-icon-hipster-character.jpg'
          alt='zebi'
          className='rounded-full w-10 h-10 ml-4 mt-4'
        />
        <div className='relative'>
          {' '}
          <label className='text-white text-sm ml-4 mt-4 inline-flex'>
            Hamza Menioui
          </label>
          <label className='text-white text-xs ml-4  block'>2 friends</label>
        </div>
        <FaUserPlus className=' text-white flex-1 mt-4 ml-20' />
        <hr />
        
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
