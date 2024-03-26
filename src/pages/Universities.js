import bannerImage from '../assets/images/Uni-Banner02.jpg';
import SindhIcon from '../assets/icons/sindh-icon.svg';
import PunjabIcon from '../assets/icons/punjab-icon.svg';
import KPKIcon from '../assets/icons/kpk-icon.svg';
import BalochistanIcon from '../assets/icons/baluchistan-icon.svg';
import universityData from '../assets/databases/universities_data.json';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



const customStyles = {
    banner: {
      backgroundImage: `url(${bannerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    },
    vectorImage: {
      objectFit: 'contain',
      height: '180px'
    },
    card: {
      margin: '10px',
      padding: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px'
    }
  };
  
  const provincesData = {
    Sindh: { icon: SindhIcon },
    Punjab: { icon: PunjabIcon },
    KPK: { icon: KPKIcon },
    Balochistan: { icon: BalochistanIcon }
  };
  
  const specializations = ["Art and Design", "Engineering and Technology", "General", "Medical"];

  
const Universities = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');


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
    if (cities.length > 0) {
      setSelectedCity(cities[0]); // Set the first city as the selected city
    }
  }, [cities]);

  useEffect(() => {
    setUniversities(universityData);
  }, []);

  const handleProvinceSelect = (provinceKey) => {
    setSelectedProvince(provinceKey);
    const citiesFromDatabase = [...new Set(universityData.filter(uni => uni.Province === provinceKey).map(uni => uni.City))];
    setCities(citiesFromDatabase);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setUniversities(universityData.filter(uni => uni.City === city));
    setSelectedUniversity(null);
  };

  const handleUniversityClick = (university) => {
    setSelectedUniversity(university);
  };

  const handleSearch = () => {
    let filteredUniversities = universityData;

    if (selectedCity) {
      filteredUniversities = filteredUniversities.filter(uni => uni.City === selectedCity);
    }

    if (selectedSector) {
      filteredUniversities = filteredUniversities.filter(uni => uni.Sector === selectedSector);
    }

    if (selectedSpecialization) {
      filteredUniversities = filteredUniversities.filter(uni => uni.Specialization === selectedSpecialization);
    }

    if (searchTerm) {
      filteredUniversities = filteredUniversities.filter(uni => uni['University Name'].toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setUniversities(filteredUniversities);
    setSelectedUniversity(null);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'sector':
        setSelectedSector(value);
        break;
      case 'specialization':
        setSelectedSpecialization(value);
        break;
      default:
        break;
    }
  };

    return (
        <div>
           <div className='flex flex-col items-left py-12 pb-8 pl-12'>
        <h1 class="flex items-center text-5xl pb-8 pt-12 font-extrabold dark:text-indigo ">Explore<span class="bg-indigo-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">New</span></h1>

        
        <div className='row'>
                      
            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
              Sindh
            </button>

            <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              Punjab
            </button>

            <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
              KPK
            </button>

            <button type="button" className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
              Balochistan
            </button>
                                

        </div>
        </div>                          
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {Object.keys(provincesData).map((provinceKey, index) => (
          <div key={index} className="cursor-pointer p-4 bg-white shadow-md rounded-lg">
            <img src={provincesData[provinceKey].icon} alt={provinceKey} className="mx-auto" style={customStyles.vectorImage} />
            <h3 className="text-xl font-semibold text-center mt-4">{provinceKey}</h3>
          </div>
        ))}
      </div> */}

      {selectedProvince && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {cities.map((city, index) => (
            <div key={index} className="cursor-pointer p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-center">{city}</h3>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 items-end">
        <div>
          <select className="w-full border rounded-md p-2" aria-label="Select Sector" onChange={(e) => handleFilterChange('sector', e.target.value)}>
            <option>Select Sector</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div>
          <select className="w-full border rounded-md p-2" aria-label="Select City" onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
            <option value="">All Cities</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <select className="w-full border rounded-md p-2" aria-label="Select Specialization" onChange={(e) => handleFilterChange('specialization', e.target.value)}>
            <option>Select Specialization</option>
            {specializations.map((specialization, index) => (
              <option key={index} value={specialization}>{specialization}</option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search University"
            className="w-full border rounded-md p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="flex flex-col items-center">
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
              onClick={() => handlePageChange(currentPage - 1)}
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
                {/* Cards */}
{/*                 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {universities.map((uni, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img src={uni.Image} alt={uni['University Name']} className="w-full rounded-md mb-4" />
            <h3 className="text-xl font-semibold">{uni['University Name']}</h3>
            <p>Ranking: {uni.ranking}</p>
            <p>World Rank: {uni['World Rank']}</p>
            <p>Excellence Rank: {uni['Excellence Rank']}</p>
            <p>Specialization: {uni.Specialization}</p>
            <p>Sector: {uni.Sector}</p>
            <Link to={`/UniversityDetailsPage/${index}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
          </div>
        ))}
      </div> */}
        </div>
    );
};

export default Universities;