import React from 'react';
import { useParams } from 'react-router-dom';
import universityData from '../assets/databases/universities_data.json';

const UniversityDetailsPage = () => {
  const { id } = useParams();
  const university = universityData[id];

  if (!university) {
    return <div className="text-center py-10 text-lg font-semibold">University not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="flex flex-col md:flex-row items-center gap-4 p-5">
        <img src={university.Image} alt={`${university['University Name']} Logo`} className="w-24 h-24 object-contain rounded-full shadow-md" />
        <h1 className="text-2xl font-bold text-gray-700">{university['University Name']}</h1>
      </div>
      <div className="my-5">
        <img src={university.University_Image} alt={university['University Name']} className="w-full h-auto rounded-lg shadow-lg" />
      </div>
      <div className="space-y-4">
        <p className="text-gray-600">{university.about}</p>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p className="font-semibold">Mission:</p>
          <p className="text-gray-600">{university.mission}</p>
          <p className="font-semibold mt-4">Vision:</p>
          <p className="text-gray-600">{university.vision}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p><strong>Established Since:</strong> {university['Established Since']}</p>
          <p><strong>Sector:</strong> {university.Sector}</p>
          <p><strong>Chartered By:</strong> {university['Chartered By']}</p>
          <p><strong>City:</strong> {university.City}</p>
          <p><strong>Province:</strong> {university.Province}</p>
          <p><strong>Recognised University:</strong> {university['Recognised University']}</p>
          <p><strong>Specialization:</strong> {university.Specialization}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p className="font-semibold">Departments:</p>
          <ul className="list-disc pl-5">
            {university.departments.map((dept, index) => (
              <li key={index} className="text-gray-600">{dept}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailsPage;
