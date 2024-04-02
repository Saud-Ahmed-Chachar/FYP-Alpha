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

  return (
    <>
      <div>
        <h1>Admissions</h1>
      </div>
      <div className="container max-w-3xl px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-3 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200" style={{ width: '20%' }}>
                      University
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"style={{ width: '20%' }} >
                      Sector
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200" style={{ width: '20%' }}>
                      Deadline
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200" style={{ width: '40%' }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through universities data and render rows */}
                  {universities.map((university, index) => (
                    <tr key={index}>
                      <td className="px-3 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                              <img alt="Logo" src={university.University_Image} className="mx-auto object-cover rounded-full h-10 w-10" />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">{university['University Name']}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">{university.Sector}</p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">{"20 August, 2024"}</p>
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
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} type="button" className={`w-8 h-8 p-1 mx-1 text-sm ${currentPage === i + 1 ? 'text-indigo-500' : 'text-gray-600'} bg-white border rounded-full hover:bg-gray-100`} onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button type="button" className="w-8 h-8 p-1 ml-1 text-sm text-gray-600 bg-white border rounded-full hover:bg-gray-100" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortalAdmissions;
