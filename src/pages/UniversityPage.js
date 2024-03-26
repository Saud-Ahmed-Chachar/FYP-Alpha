import React, { useState, useEffect } from 'react';
import universityData from '../assets/databases/universities_data.json';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

const UniversityPage = () => {
    const [universities, setUniversities] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [showAll, setShowAll] = useState(true);






  // Define pagination variables
  const itemsPerPage = 10;
  const totalPages = Math.ceil(universities.length / itemsPerPage);


  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Function to paginate universities array
  const paginate = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return universities.slice(startIndex, endIndex);
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to generate array of page numbers to display
  const getPageNumbers = () => {
    const maxPagesToShow = 5; // Change this value to adjust the maximum number of page links to show
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  useEffect(() => {
    setUniversities(universityData);
  }, []);
// Function to handle province filter
const handleProvinceFilter = (province) => {
    setSelectedProvince(province);
    const filteredUniversities = universityData.filter(uni => uni.Province === province);
    setUniversities(filteredUniversities);
    setCurrentPage(1); // Reset pagination to first page
    setShowAll(false); // Set showAll to false when a province filter is applied
};
// Function to handle "All" button click
const handleShowAll = () => {
    setShowAll(true);
    setUniversities(universityData); // Reset universities to the original dataset
    setSelectedProvince(''); // Reset selectedProvince
    setCurrentPage(1); // Reset pagination to first page
};

  const filteredUniversities = showAll ? universities : universityData;

    return (
        <div>
           <div className='flex flex-col items-left py-6  pl-12'>
           <h1 class="flex items-center text-5xl pt-12 font-extrabold dark:text-indigo ">Explore<span class="bg-indigo-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">New</span></h1>
          </div>
        <div className=" flex flex-col lg:flex-row-reverse justify-between items-center p-8 lg:p-12">
          <div className="lg:w-1/3">
        {/* search bar */}
              <SearchBar />
          </div>
        <div className='Province flex flex-wrap justify-center lg:justify-start gap-1 mt-4 lg:mt-0flex flex-wrap justify-center lg:justify-start gap-2 mt-4 lg:mt-0 w-full lg:w-2/3'>
            <button type="button" className={"text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" }
            onClick={handleShowAll}>
                All
            </button>

            <button type="button" className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
            onClick={()=>handleProvinceFilter("Islamabad Capital Territory")}>
              Federal 
            </button>  

            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={()=>handleProvinceFilter("Sindh")}>
              Sindh
            </button>

            <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            onClick={()=>handleProvinceFilter("Punjab")}>
              Punjab
            </button>

            <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            onClick={()=>handleProvinceFilter("KPK")}>
              KPK
            </button>

            <button type="button" className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
            onClick={()=>handleProvinceFilter("Balochistan")}>
              Balochistan
            </button>
            
        </div>
        </div>
        <div className='flex'>
          <div className='p-4'>
            <Filters />
          </div>
          <div className="flex flex-col items-center pl-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
        {paginate(currentPage).map((uni, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex">
            <img className="h-48 w-48 object-cover object-center" src={uni.Image} alt={uni['University Name']} />
            <div className="p-6">
              <h3 className="text-xl font-semibold">{uni['University Name']}</h3>
              <p>Ranking: {uni.ranking}</p>
              <p>World Rank: {uni['World Rank']}</p>
              <p>Excellence Rank: {uni['Excellence Rank']}</p>
              <p>Specialization: {uni.Specialization}</p>
              <p>Sector: {uni.Sector}</p>
              <a href={`/UniversityDetailsPage/${index}`} className="text-blue-500 mt-2 inline-block">View Details</a>
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation example" className="mt-8">
        <ul className="list-none flex">
          {/* Previous button */}
          <li>
            <a
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                currentPage === 1 ? 'text-neutral-500 pointer-events-none' : 'text-black'
              } transition-all duration-300 dark:text-neutral-400`}
              onClick={() => {
  if (currentPage > 1) {
    handlePageChange(currentPage - 1);
  }
}}
            >
              Previous
            </a>
          </li>

          {/* Page numbers */}
          {getPageNumbers().map((page) => (
            <li key={page}>
              <a
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                  page === currentPage ? 'text-primary-700 font-medium' : 'text-black hover:bg-indigo-100 hover:text-indigo'
                } transition-all duration-300`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}

          {/* Next button */}
          <li>
            <a
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                currentPage === totalPages ? 'text-neutral-500 pointer-events-none' : 'text-black'
              } transition-all duration-300 dark:text-neutral-400`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
          </div>
        </div>

        </div>

        
    );
};

export default UniversityPage;