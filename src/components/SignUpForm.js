import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase"; // Import your Firebase authentication instance

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("New user registered:", user);
      setSuccessMessage('Sign up successful! Please login.'); // Set success message
      // You can redirect the user to another page after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message); // Display error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 w-full">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center sm:text-3xl">Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input autoComplete="off" id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="First Name" />
                    <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
                  </div>
                  <div className="relative">
                    <input autoComplete="off" id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Last Name" />
                    <label htmlFor="lastName" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
                  </div>
                </div>
                <div className="relative">
                  <input autoComplete="off" id="email" name="email" type="text" value={formData.email} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                </div>
                <div className="relative">
                  <input autoComplete="off" id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>
                <div className="relative">
                  <input autoComplete="off" id="cpassword" name="cpassword" type="password" value={formData.cpassword} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Confirm Password" />
                  <label htmlFor="cpassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                </div>

                <div className="relative flex justify-center">
                  <button type="submit" className="bg-cyan-500 text-white rounded-md px-4 py-2">Create Account</button>
                </div>
                {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message */}
              </div>
            </form>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm font-light text-gray-600">
              Already have an account? 
              <a href="/login" className="font-medium text-cyan-600 hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
