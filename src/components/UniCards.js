import React, { useEffect, useState } from 'react';
import universitiesData from './universities_data.json';

const UniCards = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    setUniversities(universitiesData);
  }, []);

  return (
    <div className="p-4">
       <div className="text-xs  text-gray-100 uppercase dark:bg-indigo-500"  style={{ background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)', color: 'white', boxSizing: 'border-box' }}>      <h1 className="my-4 p-4 text-3xl font-bold">Featured Universities</h1></div>

      <div className="overflow-x-auto overflow-y-hidden">
        <div className="flex flex-nowrap">
          {universities.map((uni, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2">
              <div className="relative flex flex-col h-full rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg" style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
                <a href="#" className="p-4 relative flex h-60 overflow-hidden rounded-xl">
                  <img src={uni.Image} alt="University" className="object-cover w-full h-full" />
                </a>
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <a href="#">
                      <div className="overflow-hidden">
                        <h5 className="text-xl tracking-tight text-slate-900">{uni['University Name']}</h5>
                      </div>
                    </a>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <p>
                      <span className="text-1xl font-bold-gray text-slate-900">{uni.Sector}</span>
                    </p>
                    <div className="flex items-center">
                      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">Ranking {uni.ranking}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniCards;
