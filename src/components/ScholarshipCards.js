import React, { useState, useEffect } from 'react';
import scholarshipData from '../assets/databases/Scholarship-FullyFunded.json';

const ScholarshipCards = () => {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        setScholarships(scholarshipData);
    }, []);

    return (
        <div className="p-4">
            <h1 className="my-4 p-4 text-3xl font-bold">Featured Scholarships</h1>
            <div className="flex items-center overflow-x-auto p-4">
                {scholarships.map((scholarship, index) => (
                    <div key={index} className="relative flex-shrink-0 max-w-xs mx-2 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <a href="#" className="object-fit flex item-center p-8">
                            <img src={scholarship.Image} alt="Scholarship" className="object-cover w-full h-full" />
                        </a>
                        <div className="mt-4 px-5 pb-5 flex flex-col justify-between">
                            <div className="mb-5">
                                <a href="#">
                                    <div className="overflow-hidden">
                                        <h5 className="text-xl tracking-tight text-slate-900">{scholarship.Title}</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div className="flex items-center">
                                    <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{scholarship.Info}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScholarshipCards;
