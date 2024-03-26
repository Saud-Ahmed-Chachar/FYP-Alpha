import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import scholarshipData from '../assets/databases/Scholarship-FullyFunded.json';

const ScholarshipPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(""); // State to track selected filter

  useEffect(() => {
    setScholarships(scholarshipData);
    setFilteredScholarships(scholarshipData);
  }, []);

  const handleFilter = (filterType) => {
    setSelectedFilter(filterType); // Update selected filter
    if (filterType === 'fullyFunded') {
      setFilteredScholarships(scholarships.filter(scholarship => scholarship.Info === 'Fully Funded'));
    } else if (filterType === 'partiallyFunded') {
      setFilteredScholarships(scholarships.filter(scholarship => scholarship.Info === 'Partially Funded'));
    } else {
      setFilteredScholarships(scholarships);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center my-4 text-3xl font-bold">Scholarships For Undergraduate</h1>
      <div className="my-4 flex justify-center">
        <button 
          className={`text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${selectedFilter === 'fullyFunded' ? 'bg-indigo-600 text-white' : ''}`}
          onClick={() => handleFilter('fullyFunded')}
        >
          Fully Funded
        </button>
        <button 
          className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${selectedFilter === 'partiallyFunded' ? 'bg-indigo-600 text-white' : ''}`}
          onClick={() => handleFilter('partiallyFunded')}
        >
          Partially Funded
        </button>
        <button 
          className={`text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${!selectedFilter ? 'bg-gray-600 text-white' : ''}`}
          onClick={() => handleFilter()}
        >
          All
        </button>
      </div>
      <div className="py-8 pl-8 pr-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredScholarships.map((scholarship, index) => (
          <div key={index} className="bg-white outline outline-2 outline-gray-500 outline-offset-2 shadow-md rounded-lg p-4">
            <div className=' w-48 h-48 p-4'>
            <div className="object-fit flex item-center">
              <img src={scholarship.Image} alt={scholarship.Title} className="w-full h-full object-cover" />
            </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h3 className="text-xl font-semibold">{scholarship.Title}</h3>
                <p>{scholarship.Info}</p>
              </div>
            </div>
              <div>
              <Link to={`/scholarship/${index}`} className="text-blue-500">Details</Link>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipPage;
