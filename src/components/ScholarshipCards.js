import React, { useState, useEffect } from 'react';
import scholarshipData from '../assets/databases/Scholarship-FullyFunded.json';

const ScholarshipCards = () => {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        setScholarships(scholarshipData);
    }, []);

    return (
        <div className="p-4 overflow-y-hidden">
            <h1 className="my-4 p-4 text-3xl font-bold">Featured Scholarships</h1>
            <div className="overflow-x-auto overflow-y-hidden">
                <div className="flex flex-nowrap">
                    {scholarships.map((scholarship, index) => (
                        <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2">
                            <div className="relative flex flex-col h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105" style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
                                <a href="#" className="object-fit flex item-center p-8">
                                    <img src={scholarship.Image} alt="Scholarship" className="object-cover w-full h-full" />
                                </a>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div>
                                        <a href="#">
                                            <div className="overflow-hidden">
                                                <h5 className="text-xl tracking-tight text-slate-900">{scholarship.Title}</h5>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="flex items-end justify-between mt-auto">
                                        <div>
                                            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{scholarship.Info}</span>
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

export default ScholarshipCards;
