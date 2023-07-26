import React from 'react';

export const Navbar = () => {
  return (
    <div className=' flex justify-between items-center h-24 max-w-[1240px] mx-auto p-4 text-stone-900 text-lg '>
      <h1 className='w-full textt-3xl font-bold text-[#00df9a]'>Lander</h1>
      <ul className='flex'>
        <li className='p-4'>
          <a href='Home.jsx'>Home</a>
        </li>
        <li className='p-4'>
          <a href='Home.jsx'>About</a>
        </li>
        <li className='p-4'>
          <a href='Home.jsx'>Services</a>
        </li>
        <li className='align-text-top right p-3 '>
          <button className=' border-none p-1 px-4  rounded-3xl bg-black text-white delay-150 hover:px-8 hover:rounded-sm  transition-all '>
            SignUp
          </button>
        </li>
      </ul>
    </div>
  );
};
