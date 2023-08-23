import React, { useState, useEffect } from 'react';
import pic from '../../assets/registerpic2.jpg';
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLocationArrow,
  FaUser,
  FaPhone,
  FaImage,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    profilePicture: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setUser((prevUser) => ({
      ...prevUser,
      profilePicture: file,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !user.firstName ||
      !user.lastName ||
      !user.address ||
      !user.phone ||
      !user.email ||
      !user.password ||
      !user.profilePicture
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('firstName', user.firstName);
      formData.append('lastName', user.lastName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('address', user.address);
      formData.append('phone', user.phone);
      formData.append('profilePicture', user.profilePicture);

      await axios
        .post(`http://localhost:3001/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const token = response.data;
          console.log('token', token);

          // localStorage.setItem('token', token);
          console.log('Registration successful!');
          toast.success('Registration successful!');
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        })
        .catch((error) => {
          if (error.response.data['error']) {
            console.log(error.response.data['error']);
            for (const key in error.response.data['error']) {
              toast.error(error.response.data['error'][key]);
            }
          }
        });
    } catch (error) {
      console.error('Error while registering:', error);
    }
  };

  return (
    <section className='h-full bg-[#f6f4eb] '>
      <div className='container h-full p-10'>
        <div className='g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 '>
          <div className='w-full'>
            <div className='block rounded-lg bg-white shadow-lg '>
              <div className='g-0 lg:flex lg:flex-wrap'>
                {/* Right column container with background and description */}
                <div
                  className='relative flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none'
                  style={{
                    background: `url(${pic}) no-repeat center center / cover`,
                  }}>
                  {/* Blue overlay div */}
                  <div className='absolute top-0 right-0 bottom-0 left-0 bg-[#243144] opacity-70'></div>

                  <div className='px-4 py-6 text-white md:mx-6 md:p-12 relative z-10'>
                    <h4 className='mb-6 text-xl font-semibold'>
                      We are more than just a company
                    </h4>
                    <p className='text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>

                {/* Left column container */}
                <div className='px-4 md:px-0 lg:w-6/12'>
                  <div className='md:mx-6 md:p-12'>
                    {/* Logo */}
                    <div className='text-center'>
                      <img
                        className='mx-auto w-48'
                        src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
                        alt='logo'
                      />
                      <h4 className='mb-12 mt-1 pb-1 text-xl font-semibold'>
                        Register Now
                      </h4>
                    </div>

                    <form method='POST' encType='multipart/form-data'>
                      <p className='mb-4'>
                        Please register to create an account
                      </p>

                      <div className='flex items-center justify-between gap-2'>
                        {/* First Name input */}
                        <div className='relative w-full'>
                          <input
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleInputChange}
                            className='border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black'
                          />
                          <FaUser className='absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none' />
                        </div>

                        {/* Last Name input */}
                        <div className='relative w-full'>
                          <input
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleInputChange}
                            className='border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black'
                          />
                          <FaUser
                            icon='fa-thin fa-user'
                            className='absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none'
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className='relative'>
                        <input
                          type='email'
                          placeholder='Email'
                          name='email'
                          onChange={handleInputChange}
                          className='border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black'
                        />
                        <FaEnvelope className='absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none' />
                      </div>

                      {/* Phone Number input */}

                      <div className='relative'>
                        <input
                          type='tel'
                          placeholder='Phone Number'
                          name='phone'
                          onChange={handleInputChange}
                          className='border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black'
                        />
                        <FaPhone className='absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none' />
                      </div>
                      {/* Image Upload input */}
                      <div className='relative'>
                        <div className='flex justify-center w-full h-10 mb-4 px-4 transition bg-[#f6f4eb] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
                          <input
                            class=' w-full text-sm  p-2 text-gray-900 border-none  rounded-lg cursor-pointer bg-transparent focus:outline-none '
                            aria-describedby='file_input_help'
                            id='file_input'
                            type='file'
                            placeholder='Upload Picture'
                            name='profilePicture'
                            accept='image/*'
                            onChange={handleProfilePictureChange}
                          />
                          <FaImage className='absolute right-3 top-1/2 transform -translate-y-2 focus:outline-none' />
                        </div>
                      </div>

                      {/* Address input */}
                      <div className='relative'>
                        <input
                          type='text'
                          placeholder='Address'
                          name='address'
                          onChange={handleInputChange}
                          className='border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black'
                        />
                        <FaLocationArrow className='absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none' />
                      </div>

                      {/* Password input */}
                      <div className='relative'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Password'
                          name='password'
                          onChange={handleInputChange}
                          className='border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black'
                        />
                        <button
                          type='button'
                          onClick={handleTogglePassword}
                          className='absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none'>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      {/* Submit button */}
                      <div className='mb-12 pb-1 pt-1 text-center'>
                        <button
                          className='border-none text-sm p-2 mb-4 px-10 w-full shadow-md rounded-3xl duration-170 bg-black text-white delay-100 hover:px-8 hover:bg-slate-900 transition-all'
                          onClick={handleSubmit}>
                          Register
                        </button>
                      </div>
                      {/* {error && <div className='text-red-500'>{error}</div>} */}
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>Do you have an account?</p>

                        <button
                          type='button'
                          className='inline-block rounded-3xl  px-6 pb-[6px] pt-2 text-xs bg-black text-white font-medium uppercase leading-normal border-none shadow-md hover:bg-slate-900 hover:px-8 hover:mr-3 transition-all'
                          onClick={() => {
                            navigate('/Login');
                          }}>
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
      />
    </section>
  );
}
