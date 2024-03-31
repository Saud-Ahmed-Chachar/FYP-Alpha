import React, { useState } from 'react';
import profile from '../assets/images/profile.jpg';

const formatLabel = (label) => {
  // Replace camelCase with spaces and capitalize each word
  return label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (char) => char.toUpperCase());
};


const UserProfile = () => {

  const [selectedFiles, setSelectedFiles] = useState({
    passportSizePhoto: null,
    cnicFrontCertificate: null,
    cnicBackCertificate: null,
    domicile: null
  });

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFiles({ ...selectedFiles, [fileType]: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Array of upload sections
  const uploadSections = [
    { label: 'Passport Size Photo', key: 'passportSizePhoto' },
    { label: 'CNIC Front Certificate', key: 'cnicFrontCertificate' },
    { label: 'CNIC Back Certificate', key: 'cnicBackCertificate' },
    { label: 'Domicile', key: 'domicile' }
  ];
  // Array of upload sections
  const uploadEduSections = [
    { label: 'Last Degree', key: 'lastDegree' },
    { label: 'Matriculation Degree', key: 'matricDegree' },
    { label: 'Hope Certificate', key: 'hopeCertificate' }
  ];


  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Ameer Ali',
    cnic: '45102-3867927-1',
    email: 'ameerali.bscssef20@iba-suk.edu.pk',
    phoneNumber: '+92 9876543210',
    fatherOrHusbandName: 'Sher Khan',
    guardiansName: 'Zulfiqar Ali',
    relationWithGuardian: 'Brother',
    gender: 'Male',
    maritalStatus: 'Single',
    dateOfBirth: '10-06-2000',
    religion: 'Muslim',
    isGovernmentServant: 'No',
    hasDisability: 'No'
  });
    // State for Educational Information section
    const [isEditingEducation, setIsEditingEducation] = useState(false);
    const [eduFormData, setEduFormData] = useState({
      lastDegree: 'BSc',
      degreeType: 'Bachelor',
      institute: 'Shah Abdul Latif University, Khairpur',
      country: 'Pakistan',
      passingYear: '2021',
      percentage: '80%',
      gradeCGPA: 'A1'
    });
  
    const handleEditProfileClick = () => {
      setIsEditingProfile(true);
    };
  
    const handleCancelProfileClick = () => {
      setIsEditingProfile(false);
    };
  
    const handleSaveProfileClick = () => {
      setIsEditingProfile(false);
      console.log(formData);
    };
  
    const handleEditEducationClick = () => {
      setIsEditingEducation(true);
    };
  
    const handleCancelEducationClick = () => {
      setIsEditingEducation(false);
    };
  
    const handleSaveEducationClick = () => {
      setIsEditingEducation(false);
      console.log(eduFormData);
    };
  
    const handleProfileInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleEducationInputChange = (e) => {
      const { name, value } = e.target;
      setEduFormData({ ...eduFormData, [name]: value });
    };
  return (
    <div>
      <div className="flex items-center justify-between bg-gray-200 rounded-md py-4 px-6">
        <div className="flex items-center">
          <div className="mr-4">
            <img className="w-32 h-32 object-cover rounded-full" src={profile} alt="logo" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ameer Ali</h1>
        </div>
      </div>
      {/* Profile Information */}
      <div className="mt-6 flex">
        {/* First Column */}
        <div className="flex-1">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
            {isEditingProfile ? (
              <form>
                {Object.keys(formData).map((key, index) => (
                  <div key={index} className="mt-4 p-4 shadow-md rounded-md">
                    <label htmlFor={key}>{formatLabel(key)}</label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleProfileInputChange}
                      className="mt-2 px-3 py-2 border rounded-md w-full"
                    />
                  </div>
                ))}
              </form>
            ) : (
              <>
                {Object.entries(formData).map(([key, value], index) => (
                  <div key={index} className="mt-4 p-4 shadow-md rounded-md">
                    <label htmlFor={key}>{formatLabel(key)}</label>
                    <p className="text-gray-600">{value}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Second Column */}
        <div className="flex-1">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800">Upload Documents</h2>
            {/* Loop over upload sections */}
            {uploadSections.map((section, index) => (
              <div key={index} className="border border-gray-300 mt-4 p-4 rounded-md">
                <div className="mt-4 w-32 h-32 border border-gray-300">
                  {selectedFiles[section.key] && <img src={selectedFiles[section.key]} alt="Selected File" className="object-cover w-full h-full" />}
                </div>
                <div className="mt-4 p-4 shadow-md rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col">
                  <label htmlFor={`${section.key}Input`}>{section.label}</label>
                  <input type="file" id={`${section.key}Input`} className="mt-2" onChange={(e) => handleFileChange(e, section.key)} accept="image/*" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Save and Edit button */}
      <div className="flex justify-center mt-4 p-4">
        {isEditingProfile ? (
          <>
            <button onClick={handleSaveProfileClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
              Save
            </button>
            <button onClick={handleCancelProfileClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEditProfileClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Section
          </button>
        )}
      </div>

      {/* Educational Information */}
      <div className="mt-6 flex">
        {/* First Column */}
        <div className="flex-1">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800">Educational Information</h2>
            {isEditingEducation ? (
              <form>
                {Object.keys(eduFormData).map((key, index) => (
                  <div key={index} className="mt-4 p-4 shadow-md rounded-md">
                    <label htmlFor={key}>{formatLabel(key)}</label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={eduFormData[key]}
                      onChange={handleEducationInputChange}
                      className="mt-2 px-3 py-2 border rounded-md w-full"
                    />
                  </div>
                ))}
              </form>
            ) : (
              <>
                {Object.entries(eduFormData).map(([key, value], index) => (
                  <div key={index} className="mt-4 p-4 shadow-md rounded-md">
                    <label htmlFor={key}>{formatLabel(key)}</label>
                    <p className="text-gray-600">{value}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Second Column */}
        <div className="flex-1">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800">Upload Documents</h2>
            {/* Loop over upload sections */}
            {uploadEduSections.map((section, index) => (
              <div key={index} className="border border-gray-300 mt-4 p-4 rounded-md">
                <div className="mt-4 w-32 h-32 border border-gray-300">
                  {selectedFiles[section.key] && <img src={selectedFiles[section.key]} alt="Selected File" className="object-cover w-full h-full" />}
                </div>
                <div className="mt-4 p-4 shadow-md rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col">
                  <label htmlFor={`${section.key}Input`}>{section.label}</label>
                  <input type="file" id={`${section.key}Input`} className="mt-2" onChange={(e) => handleFileChange(e, section.key)} accept="image/*" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Save and Edit button */}
      <div className="flex justify-center mt-4 p-4">
        {isEditingEducation ? (
          <>
            <button onClick={handleSaveEducationClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
              Save
            </button>
            <button onClick={handleCancelEducationClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEditEducationClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Section
          </button>
        )}
      </div>

    </div>
  );
};

export default UserProfile;
