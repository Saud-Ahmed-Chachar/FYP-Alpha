import React, { useState } from 'react';

const Signin = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="wrapper max-w-xs bg-white p-6 rounded-lg shadow-md">
      <div className="title-text flex w-full">
        <div className={`title flex-1 text-center text-4xl font-bold transition-all duration-500 ${isSignup ? 'translate-x-[-100%]' : ''}`}>Login Form</div>
        <div className={`title flex-1 text-center text-4xl font-bold transition-all duration-500 ${isSignup ? '' : 'translate-x-[100%]'}`}>Signup Form</div>
      </div>
      <div className="form-container mt-5">
        <div className="slide-controls relative flex items-center justify-between border border-gray-300 rounded-lg p-1">
          <input type="radio" name="slide" id="login" checked={!isSignup} onChange={() => setIsSignup(false)} className="hidden" />
          <input type="radio" name="slide" id="signup" checked={isSignup} onChange={() => setIsSignup(true)} className="hidden" />
          <label htmlFor="login" className={`slide login flex-1 cursor-pointer text-center ${isSignup ? 'text-black' : 'text-white'} font-medium bg-gradient-to-l from-blue-900 to-blue-500 rounded-lg`}>Login</label>
          <label htmlFor="signup" className={`slide signup flex-1 cursor-pointer text-center ${isSignup ? 'text-white' : 'text-black'} font-medium bg-gradient-to-l from-blue-900 to-blue-500 rounded-lg`}>Signup</label>
          <div className={`slider-tab absolute left-0 w-1/2 h-full bg-gradient-to-l from-blue-900 to-blue-500 rounded-lg transition-all duration-500 ${isSignup ? 'translate-x-full' : ''}`}></div>
        </div>
        <div className="form-inner flex w-full mt-5">
          <form action="#" className={`login w-1/2 ${isSignup ? 'translate-x-[-100%]' : ''} transition-all duration-500`}>
            {/* Login form fields */}
          </form>
          <form action="#" className={`signup w-1/2 ${isSignup ? '' : 'translate-x-[100%]'} transition-all duration-500`}>
            {/* Signup form fields */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
