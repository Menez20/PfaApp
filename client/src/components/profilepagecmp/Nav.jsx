import React, { useState } from 'react';
import pic from '../../assets/registerpic2.jpg';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='bg-gray-800'>
      <div className='container px-4 mx-auto'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo and Name */}
          <div className='flex items-center'>
            <img src='your-logo.png' alt='Logo' className='w-8 h-8 mr-2' />
            <span className='text-white text-lg font-semibold'>
              Your Logo Name
            </span>
          </div>

          {/* Avatar with Dropdown */}
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='flex items-center text-white focus:outline-none'>
              <img src={pic} alt='Avatar' className='w-10 h-10 rounded-full' />
            </button>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg'>
                <ul className='text-gray-800'>
                  <li className='hover:bg-gray-200 px-4 py-2 cursor-pointer'>
                    Profile
                  </li>
                  <li className='hover:bg-gray-200 px-4 py-2 cursor-pointer'>
                    Settings
                  </li>
                  <li className='hover:bg-gray-200 px-4 py-2 cursor-pointer'>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
