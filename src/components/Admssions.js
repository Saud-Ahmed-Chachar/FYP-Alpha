// Admissions.js
import React, { useState, useEffect } from 'react';
import universitiesData from './universities_data.json';
const Admissions = () => {
  // State to store the university data
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    setUniversities(universitiesData);
  }, []);
  
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
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      University
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Sector
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Deadline
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
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
              <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                <div className="flex items-center">
                  <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                    <svg width="9" fill="currentColor" height="8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
                    </svg>
                  </button>
                  <button type="button" className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100">
                    1
                  </button>
                  <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                    2
                  </button>
                  <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                    3
                  </button>
                  <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                    4
                  </button>
                  <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                    <svg width="9" fill="currentColor" height="8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admissions;
