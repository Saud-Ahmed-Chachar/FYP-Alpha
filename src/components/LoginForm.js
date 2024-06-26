import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase"; // Import your Firebase authentication instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("User logged in:", user);
      // Redirect user to Dashboard page after successful login
      navigate('/portal');
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.message); // Set error message to display to the user
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center sm:text-3xl">Login</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input autoComplete="off" id="email" name="email" type="text" value={formData.email} onChange={handleChange} className="peer placeholder-transparent h-10 w-full sm:w-80 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                </div>
                <div className="relative">
                  <input autoComplete="off" id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="peer placeholder-transparent h-10 w-full sm:w-80 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>
                {error && <p className="text-red-500">{error}</p>} {/* Display error message if exists */}
                <div className="relative">
                  <button type="submit" className="bg-indigo-700 text-white rounded-md px-4 py-2 w-full sm:w-auto">Login</button>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm font-light text-gray-600">
              Don't have an account? 
              <a href="/signup" className="font-medium text-indigo-600 hover:underline"> Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
