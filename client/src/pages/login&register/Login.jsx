import React, { useState, useEffect } from 'react';
import pic from '../../assets/loginpicture.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        toast.warn('You are already logged in');
        navigate(`/profile/:${user._id}`);
      } else {
        navigate('/login'); // Navigate to the login page if user is not found
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    if (!user.email || !user.password) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { data } = response;

      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login successful');

      setTimeout(() => {
        navigate(`/profile/:${data.user._id}`);
      }, 1800);
    } catch (error) {
      console.error(error);

      toast.error('Invalid credentials');

      setTimeout(() => {
        window.location.reload(true);
      }, 3000);
    }
  };
  const navigate = useNavigate();
  return (
    <section className='h-full bg-gradient-to-b from-zinc-100 to-teal-50 '>
      <div className='container h-full p-10'>
        <div className='g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 '>
          <div className='w-full'>
            <div className='block rounded-lg bg-white shadow-lg '>
              <div className='g-0 lg:flex lg:flex-wrap'>
                {/* <!-- Left column container--> */}
                <div className='px-4 md:px-0 lg:w-6/12'>
                  <div className='md:mx-6 md:p-12'>
                    {/* <!--Logo--> */}
                    <div className='text-center'>
                      <img
                        className='mx-auto w-48'
                        src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
                        alt='logo'
                      />
                      <h4 className='mb-12 mt-1 pb-1 text-xl font-semibold'>
                        Welcome Back
                      </h4>
                    </div>

                    <form method='POST'>
                      <p className='mb-4'>Please login to your account</p>
                      {/* <!--Email input--> */}
                      <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        className='border-none p-3 w-full mb-4 shadow-md  rounded-md  bg-gradient-to-b from-zinc-100 to-teal-50 text-black '
                      />

                      {/* <!--Password input--> */}
                      <div className='relative '>
                        {' '}
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='password'
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                          className='border-none p-3 w-full mb-4 shadow-md  rounded-md  bg-gradient-to-b from-zinc-100 to-teal-50 text-black'
                        />
                        <button
                          type='button'
                          onClick={handleTogglePassword}
                          className='absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none'>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      {/* <!--Submit button--> */}
                      <div className='mb-12 pb-1 pt-1 text-center'>
                        <button
                          className=' border-none text-sm p-2 mb-4 px-10 w-full shadow-md  rounded-3xl duration-170 bg-black text-white delay-100 hover:px-8 hover:bg-slate-900 transition-all '
                          onClick={handleSubmit}>
                          Log in
                        </button>

                        {/* <!--Forgot password link--> */}
                        <a href='#!'>Forgot password?</a>
                      </div>

                      {/* <!--Register button--> */}
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>Don't have an account?</p>

                        <button
                          type='button'
                          className='inline-block rounded-3xl  px-6 pb-[6px] pt-2 text-xs bg-black text-white font-medium uppercase leading-normal border-none shadow-md hover:bg-slate-900 hover:px-8 hover:mr-3 transition-all'
                          onClick={() => {
                            navigate('/register');
                          }}>
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
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
              </div>
            </div>
          </div>
        </div>

        {/* <!--Toast--> */}
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
      </div>
    </section>
  );
}
