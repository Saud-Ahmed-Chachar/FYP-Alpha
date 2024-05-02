import React, { useState, useEffect } from 'react';
import universityData from '../assets/databases/universities_data.json';


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon from Font Awesome


const sortOptions = [
  { name: 'Name', value: 'University Name' },
  { name: 'Rank', value: 'ranking' },
  { name: 'World Rank', value: 'World Rank' },
  { name: 'Excellence Rank', value: 'Excellence Rank' },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const UniversityPage = () => {
    const [universities, setUniversities] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [sortOption, setSortOption] = useState(sortOptions[0].value); // Default sorting by Name
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
  
    
    // Define the array of department names
  const departments = ["Computer", "Engineering", "Medicine", "Commerce"];
  // State to hold the selected department
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Function to handle department filter
  const handleDepartmentFilter = (selectedValue) => {
    // Do something with the selected department
    console.log('Selected department:', selectedValue);
    setSelectedDepartment(selectedValue);

    // Filter universities based on whether their department array includes the selected department
    const filteredUniversities = universityData.filter(uni =>
        uni.departments && uni.departments.includes(selectedValue)
    );

    // Set the filtered universities
    setUniversities(filteredUniversities);
    // You can perform further actions here, like resetting pagination or handling other state updates
};



    const handleChange = (event) => {
      const { value } = event.target;
      setSearchTerm(value);
      const filteredUniversities = universityData.filter((uni) =>
          uni['University Name'].toLowerCase().includes(value.toLowerCase())
      );
      setUniversities(filteredUniversities);
  };
  

    const handleSelectSuggestion = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
        handleUniversitySelection(suggestion);
    };

    const handleUniversitySelection = (selectedUniversity) => {
        // Redirect to the details page of the selected university
        // You can use react-router-dom's history.push() or any other routing mechanism here
        console.log(`Redirecting to details page of ${selectedUniversity}`);
    };
    // Define pagination variables
    const itemsPerPage = 12;
    const totalPages = Math.ceil(universities.length / itemsPerPage);

    // State for current page
    const [currentPage, setCurrentPage] = useState(1);

    // Function to paginate universities array

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
      // Sort universities based on selected sorting option
      const sortedUniversities = universityData.slice().sort((a, b) => {
          if (a[sortOption] < b[sortOption]) {
              return -1;
          }
          if (a[sortOption] > b[sortOption]) {
              return 1;
          }
          return 0;
      });
  
      // Set sorted universities data
      setUniversities(sortedUniversities);
  
  }, [sortOption]); // Trigger effect whenever sortOption changes
  
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

    // Function to handle sector filter
    // Function to handle sector filter
const handleSectorFilter = (sector) => {
    setSelectedSector(sector);
    const filteredUniversities = universityData.filter(uni => uni.Sector === sector);
    setUniversities(filteredUniversities);
    setCurrentPage(1); // Reset pagination to first page
    setShowAll(false); // Set showAll to false when a sector filter is applied
};

    // Function to handle "All" button click
    const handleShowAll = () => {
        setShowAll(true);
        setUniversities(universityData); // Reset universities to the original dataset
        setSelectedProvince(''); // Reset selectedProvince
        setSelectedSector(''); // Reset selectedSector
        setCurrentPage(1); // Reset pagination to first page
    };

    const handleSort = (value) => {
      setSortOption(value);
  };

  // Sort universities based on selected sorting option
  const sortedUniversities = universities.slice().sort((a, b) => {
      if (a[sortOption] < b[sortOption]) {
          return -1;
      }
      if (a[sortOption] > b[sortOption]) {
          return 1;
      }
      return 0;
  });

    // Function to paginate sorted universities array
const paginateSorted = (pageNumber) => {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedUniversities.slice(startIndex, endIndex);
};

// Function to generate array of page numbers to display
if (!getPageNumbers) {
}
    return (
        <div>
           <div className='flex flex-col items-left py-6  pl-12'>
           <h1 class="flex items-center text-5xl pt-12 font-extrabold dark:text-indigo ">Explore<span class="bg-indigo-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">New</span></h1>
          </div>
        <div className=" flex flex-col justify-between items-center p-8 lg:p-12">
          <div className="lg:w-1/3">
        {/* search bar */}
        <label
                    className="mx-auto relative bg-white border border-indigo-700 min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                    htmlFor="search-bar"
                >
                    <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" /> {/* Search Icon */}
                    <input
                        id="search-bar"
                        placeholder="Search any university..."
                        className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    {/* Suggestions dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelectSuggestion(suggestion['University Name'])}
                                >
                                    {suggestion['University Name']}
                                </li>
                            ))}
                        </ul>
                    )}
                </label>

          </div>
        
        </div>
        <div className="bg-white">
      <div>
       

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
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

            <div className="Province flex flex-wrap justify-center lg:justify-start gap-1 mt-4 lg:mt-0flex flex-wrap justify-center lg:justify-start gap-2 mt-4 lg:mt-0 w-full lg:w-2/3">
    {/* Sector filter */}
    <select
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        onChange={(e) => handleSectorFilter(e.target.value)}
    >
        <option value="Public">Public</option>
        <option value="Private">Private</option>
    </select>

    {/* Department dropdown */}
    <select
        className="text-blue-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
        value={selectedDepartment}
        onChange={(e) => handleDepartmentFilter(e.target.value)}
    >
        <option value="">Select Department</option>
        {departments.map((department, index) => (
            <option key={index} value={department}>
                {department}
            </option>
        ))}
    </select>

    {/* Other filters or buttons */}
</div>

    

            
        </div>
            <div className="flex items-center">
                             <Menu as="div" className="relative inline-block text-left">
                                  <div>
                                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                          Sort
                                          <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                      </Menu.Button>
                                  </div>

                                  <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                  >
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <div className="py-1">
                                              {sortOptions.map((option) => (
                                                  <Menu.Item key={option.name}>
                                                      {({ active }) => (
                                                          <a
                                                              href={option.href}
                                                              className={classNames(
                                                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                  active ? 'bg-gray-100' : '',
                                                                  'block px-4 py-2 text-sm'
                                                              )}
                                                              onClick={() => handleSort(option.value)}
                                                          >
                                                              {option.name}
                                                          </a>
                                                      )}
                                                  </Menu.Item>
                                              ))}
                                          </div>
                                      </Menu.Items>
                                  </Transition>
                              </Menu>

             
              
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid ">
              {/* Filters */}
              

              {/* Product grid */}
              <div className="">
                {/* University cards */}
                <div className="flex flex-col items-center pl-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
    {paginateSorted(currentPage).map((uni, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex">
            <img className="h-48 w-48 object-cover object-center sm:h-40 sm:w-40" src={uni.Image} alt={uni['University Name']} />
            <div className="p-6">
                <h3 className="text-xl font-semibold">{uni['University Name']}</h3>
                <p>Ranking: {uni.ranking}</p>
                <p>World Rank: {uni['World Rank']}</p>
                <p>Excellence Rank: {uni['Excellence Rank']}</p>
                <p>City: {uni["City"]}</p>
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
                {/* Your content */}</div>
            </div>
          </section>
        </main>
      </div>
    </div>

        </div>

        
    );
};

export default UniversityPage;
