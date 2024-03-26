import React, { useEffect, useState } from 'react';
import universitiesData from './universities_data.json';

const UniCards = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    setUniversities(universitiesData);
  }, []);

  return (
    <div className="p-4">
      <h1 className="my-4 p-4 text-3xl font-bold">Featured Universities</h1>
    <div className="flex items-center overflow-x-auto p-4">
      {universities.map((uni, index) => (
        <div key={index} className="relative flex-shrink-0 w-full max-w-xs mx-2 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <a href="#" className="relative flex h-60 overflow-hidden rounded-xl">
            <img src={uni.Image} alt="University" className="object-cover w-full h-full" />
          </a>
          <div className="mt-4 px-5 pb-5 flex flex-col justify-between">
            <div className="mb-5">
              <a href="#">
                <div className="overflow-hidden">
                  <h5 className="text-xl tracking-tight text-slate-900">{uni['University Name']}</h5>
                </div>
              </a>
              <div className="mt-2 flex items-center justify-between">
                <p>
                  <span className="text-1xl font-bold-gray text-slate-900">{uni.Sector}</span>
                </p>
                <div className="flex items-center">
                  <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">Ranking {uni.ranking}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                
                Visit              </a>
            </div>
          </div>
        </div>
      ))}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9l5 4m3.5-4h2a2.5 2.5 0 012.5 2.5v10A2.5 2.5 0 0116.5 20h-2" />
        </svg>
      </div>
    </div>
    </div>
  );
};

export default UniCards;
