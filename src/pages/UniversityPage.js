import React, { useState, useEffect } from 'react';
import universityData from '../assets/databases/universities_data.json';
import SearchBar from '../components/SearchBar';

import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'


const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const filters = [
  {
    id: 'sector',
    name: 'Sector',
    options: [
      { value: 'Public', label: 'Public', checked: false },
      { value: 'Private', label: 'Private', checked: false },
      
    ],
  },
  {
    id: 'program',
    name: 'Program',
    options: [
      { value: 'Medical', label: 'Medical', checked: false },
      { value: 'Engineering', label: 'Engineering', checked: false },
      { value: 'Art', label: 'Art', checked: false },
      { value: 'Science', label: 'Science', checked: false },
      { value: 'Business', label: 'Business', checked: false },
      { value: 'Others', label: 'Others', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const UniversityPage = () => {
    const [universities, setUniversities] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

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
        <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    

                    {filters.map((section) => (
                      <div key={section.id} className="border-t border-gray-200 px-4 py-6">
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <button
                              className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                              onClick={() => {}}
                            >
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            </button>
                          </h3>
                          <div className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      </div>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Universities</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
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

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                

              {filters.map((section) => (
  <div key={section.id} className="border-t border-gray-200 px-4 py-6">
    <>
      <h3 className="-mx-2 -my-3 flow-root">
        <button
          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
          onClick={() => {}}
        >
          <span className="font-medium text-gray-900">{section.name}</span>
          <span className="ml-6 flex items-center">
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div className="pt-6">
        <div className="space-y-6">
          {section.options.map((option, optionIdx) => (
            <div key={option.value} className="flex items-center">
              <input
                id={`filter-mobile-${section.id}-${optionIdx}`}
                name={`${section.id}[]`}
                defaultValue={option.value}
                type="checkbox"
                defaultChecked={option.checked}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                className="ml-3 min-w-0 flex-1 text-gray-500"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  </div>
))}

              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* University cards */}
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
