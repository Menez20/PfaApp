import React, { useState } from "react";
import pic from "../../assets/registerpic2.jpg";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLocationArrow,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  return (
    <section className="h-full bg-[#f6f4eb] dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Right column container with background and description */}
                <div
                  className="relative flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background: `url(${pic}) no-repeat center center / cover`,
                  }}
                >
                  {/* Blue overlay div */}
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#243144] opacity-70"></div>

                  <div className="px-4 py-6 text-white md:mx-6 md:p-12 relative z-10">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>

                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Register Now
                      </h4>
                    </div>

                    <form method="POST" enctype="multipart/form-data">
                      <p className="mb-4">
                        Please register to create an account
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        {/* First Name input */}
                        <div className="relative w-full">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black"
                          />
                          <FaUser className="absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none" />
                        </div>

                        {/* Last Name input */}
                        <div className="relative w-full">
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black"
                          />
                          <FaUser className="absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none" />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Email"
                          className="border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black"
                        />
                        <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none" />
                      </div>

                      {/* Phone Number input */}

                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black"
                        />
                        <FaPhone className="absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none" />
                      </div>

                      {/* Address input */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Address"
                          className="border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black"
                        />
                        <FaLocationArrow className="absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none" />
                      </div>

                      {/* Password input */}
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          className="border-none p-3 w-full mb-4 shadow-md rounded-md bg-[#f6f4eb] text-black"
                        />
                        <button
                          type="button"
                          onClick={handleTogglePassword}
                          className="absolute right-3 top-1/2 transform -translate-y-3.5 focus:outline-none"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      {/* Confirm Password input */}

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button className="border-none text-sm p-2 mb-4 px-10 w-full shadow-md rounded-3xl duration-170 bg-black text-white delay-100 hover:px-8 hover:bg-slate-900 transition-all">
                          Register
                        </button>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Do you have an account?</p>

                        <button
                          type="button"
                          className="inline-block rounded-3xl  px-6 pb-[6px] pt-2 text-xs bg-black text-white font-medium uppercase leading-normal border-none shadow-md hover:bg-slate-900 hover:px-8 hover:mr-3 transition-all"
                          onClick={() => {
                            navigate("/Login");
                          }}
                        >
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
    </section>
  );
}
