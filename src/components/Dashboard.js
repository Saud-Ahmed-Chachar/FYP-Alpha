import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { id } = useParams(); // Accessing the id parameter from the URL
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null,
    education: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the form data to your backend or perform any other actions
    console.log(formData);
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <ul>
          {/* Use Link component to navigate to different pages */}
          <li className="mb-2"><Link to="/about">Profile</Link></li>
          <li className="mb-2"><Link to="/universities">Universities</Link></li>
          <li className="mb-2"><Link to="/admission">Admission</Link></li>
          <li className="mb-2"><Link to="/scholarships">Scholarships</Link></li>

          {/* Add more menu items here */}
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
            <textarea id="education" name="education" value={formData.education} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
