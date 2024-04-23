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
      <h1 className="flex items-center text-5xl pb-8 pl-12 pt-12 font-extrabold dark:text-indigo ">Scholarships<span className="bg-indigo-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">New</span></h1>
      <div className="my-4 flex pl-12">
        <button 
          className={`text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${!selectedFilter ? 'bg-gray-600 text-white' : ''}`}
          onClick={() => handleFilter()}
        >
          All
        </button>
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
      </div>
      <div className="py-8 pl-8 pr-8 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {filteredScholarships.map((scholarship, index) => (
          <Link key={index} to={`/scholarship/${index}`} className="flex-none sm:flex-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex">
              <div className="w-1/2">
                <div className='h-48 w-48 pl-4'>
                  <div className="object-fit flex item-center justify-center c-center">
                    <img src={scholarship.Image} alt={scholarship.Title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-between">
                <div className="flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold">{scholarship.Title}</h3>
                    <p>{scholarship.Info}</p>
                  </div>
                </div>
                <div>
                  <p className="text-blue-500">Details</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipPage;
