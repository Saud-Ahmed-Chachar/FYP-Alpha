// PortalAdmissions.js
import React, { useState, useEffect } from 'react';
import universitiesData from '../../assets/databases/universities_data.json';

const PortalAdmissions = () => {
 // State to store the university data
 const [universities, setUniversities] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const universitiesPerPage = 10;

 useEffect(() => {
   // Slice the data to display only the first 10 rows
   const slicedData = universitiesData.slice(0, universitiesPerPage);
   setUniversities(slicedData);
 }, []);

 // Calculate total number of pages
 const totalPages = Math.ceil(universitiesData.length / universitiesPerPage);

 // Pagination functionality
 const handlePageChange = (pageNumber) => {
   setCurrentPage(pageNumber);
   // Calculate starting index of universities for the selected page
   const startIndex = (pageNumber - 1) * universitiesPerPage;
   // Slice the data based on the selected page number
   const slicedData = universitiesData.slice(startIndex, startIndex + universitiesPerPage);
   setUniversities(slicedData);
 };

 // Calculate the range of pagination numbers to display
 const startPage = Math.max(1, currentPage - 2);
 const endPage = Math.min(totalPages, startPage + 4);

  return (
    <>
      <div className="flex items-center justify-between rounded-lg py-4 px-6" style={{ 
        background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)',
        color: 'white',
        boxSizing: 'border-box'
      }}>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Admissions for Undergraduate</h1>
        </div>
      </div>
      <div className="container max-w-4xl px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="overflow-x-auto">
            <table className="w-full leading-normal">
              <thead>
                <tr>
                  <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200" style={{ width: '25%' }}>
                    University
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200" style={{ width: '25%' }} >
                    Sector
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200" style={{ width: '25%' }}>
                    Deadline
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200" style={{ width: '25%' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Map through universities data and render rows */}
                {universities.map((university, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img alt="Logo" src={university.University_Image} className="h-10 w-10 object-cover rounded-full" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900">{university['University Name']}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900">{university.Sector}</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900">20 August, 2024</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                        <span className="relative">Open</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination buttons */}
            <div className="flex justify-center mt-4">
              <button type="button" className="w-8 h-8 p-1 mr-1 text-sm text-gray-600 bg-white border rounded-full hover:bg-gray-100" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                {'<'}
              </button>
              {Array.from({ length: (endPage + 1) - startPage }, (_, i) => (
                <button key={startPage + i} type="button" className={`w-8 h-8 p-1 mx-1 text-sm ${currentPage === startPage + i ? 'text-indigo-500' : 'text-gray-600'} bg-white border rounded-full hover:bg-gray-100`} onClick={() => handlePageChange(startPage + i)}>
                  {startPage + i}
                </button>
              ))}
              <button type="button" className="w-8 h-8 p-1 ml-1 text-sm text-gray-600 bg-white border rounded-full hover:bg-gray-100" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortalAdmissions;
