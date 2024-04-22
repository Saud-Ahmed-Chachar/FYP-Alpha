import React from 'react';
import { useParams } from 'react-router-dom';
import universityPortalData from '../../assets/databases/universities_data.json';
import { useAuthState } from 'react-firebase-hooks/auth'; // Assuming you're using react-firebase-hooks for auth
import { auth, firestore } from '../../backend/firebase'; // Your Firebase config file
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore methods
import PortalUniversity from './PortalUniversity';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PortalUniversityDetails = () => {
  const { id } = useParams();
  const university = universityPortalData[id];
  //const university = universityPortalData.find(uni => uni.id === parseInt(id, 10));
  const [user] = useAuthState(auth);

  const applyNow = async () => {
    if (!user) {
      toast.error('Please log in to apply');
      return;
    }
  
    const sanitizedUniversityURL = university.University_URL.replace(/^https?:\/\//, '').replace(/\//g, '_');
    const universityApplicationsRef = doc(firestore, `applications/${sanitizedUniversityURL}/applicants`, user.email);
    const docSnap = await getDoc(universityApplicationsRef);
  
    if (docSnap.exists()) {
      toast.warning('You have already applied to this university with this email.');
    } else {
      await setDoc(universityApplicationsRef, {
        userEmail: user.email,
        userName: user.displayName, // Assuming displayName is available
        appliedAt: new Date(),
      });
      toast.success('Application submitted successfully!');
    }
  };
  
  
  
  
  if (!university) {
    return <div className="text-center py-10 text-lg font-semibold">University not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
          {university.departments && Array.isArray(university.departments) && university.departments.map((dept, index) => (
  <li key={index} className="text-gray-600">{dept}</li>
))}

          </ul>
        </div>
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={applyNow}
      >
        Apply Now 
      </button>
      </div>
    </div>
  );
};

export default PortalUniversityDetails;
