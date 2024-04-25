import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDoc, updateDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../backend/firebase";



const formatLabel = (label) => {
  return label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (char) => char.toUpperCase());
};


const validateInput = (name, value) => {
  switch (name) {
    case 'fullName':
      return /^[a-zA-Z\s]*$/.test(value); // Allows only letters and spaces
    case 'email':
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    case 'phoneNumber':
      return /^\+?[0-9]{10,15}$/.test(value); // International phone number format
    case 'cnic':
      return /^\d{5}-\d{7}-\d{1}$/.test(value); // CNIC format: 12345-1234567-1
    default:
      return true; // Default validation passes for all other fields
  }
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  // const [formData, setFormData] = useState({});
  // const [eduFormData, setEduFormData] = useState({});
  // const [previewUrls, setPreviewUrls] = useState({});
  // const [selectedFiles, setSelectedFiles] = useState({});
  // const [isEditingProfile, setIsEditingProfile] = useState(false);
  // const [isEditingEducation, setIsEditingEducation] = useState(false);



  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, "users", user.email);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData(data.profileData || {});
          setEduFormData(data.educationData || {});
          setPreviewUrls(data.uploadedFiles || {});
        }
      };
      fetchUserData().catch(console.error);
    }
  }, [user]);

  const handleInputChange = (name, value) => {
    if (validateInput(name, value)) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    } else {
        alert(`Invalid input for ${formatLabel(name)}`);
    }
};


  const [selectedFiles, setSelectedFiles] = useState({
    passportSizePhoto: null,
    cnicFrontCertificate: null,
    cnicBackCertificate: null,
    domicile: null,
    matricDegree: null,
    lastDegree: null,
    hopeCertificate: null
  });

  const [previewUrls, setPreviewUrls] = useState({
    passportSizePhoto: '',
    cnicFrontCertificate: '',
    cnicBackCertificate: '',
    domicile: '',
    matricDegree: '',
    lastDegree: '',
    hopeCertificate: ''
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Name as CNIC',
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

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


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

 
  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFiles(prev => ({ ...prev, [fileType]: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrls(prev => ({ ...prev, [fileType]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadFiles = async () => {
    const urls = {};
    for (const [key, file] of Object.entries(selectedFiles)) {
      if (!file) continue;
      const fileRef = ref(storage, `documents/${user.uid}/${new Date().getTime()}_${file.name}`);
      await uploadBytes(fileRef, file);
      urls[key] = await getDownloadURL(fileRef);
    }
    return urls;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileUrls = await uploadFiles();
    const submissionData = {
      profileData: formData,
      educationData: eduFormData,
      uploadedFiles: { ...previewUrls, ...fileUrls },
      timeStamp: serverTimestamp(),
    };
  
    const userDocRef = doc(db, "users", user.email);
    setDoc(userDocRef, submissionData, { merge: true })
      .then(() => {
        console.log("Data successfully saved.");
        navigate('/portal/university');
      })
      .catch(console.error);
  };


  const genderOptions = ['Male', 'Female', 'Other'];
  const yesNoOptions = ['Yes', 'No'];

  const inputSettings = {
    fullName: { type: 'text', placeholder: 'Full Name as on CNIC' },
    cnic: { type: 'text', placeholder: '12345-1234567-1' },
    email: { type: 'email', placeholder: 'example@email.com' },
    phoneNumber: { type: 'tel', placeholder: '+923001234567' },
    fatherOrHusbandName: { type: 'text', placeholder: 'Enter father or husband name' },
    guardiansName: { type: 'text', placeholder: 'Enter guardian name' },
    relationWithGuardian: { type: 'text', placeholder: 'Specify relation with guardian' },
    gender: { type: 'select', options: genderOptions }, // Dropdown for gender
    maritalStatus: { type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'] }, // Dropdown for marital status
    dateOfBirth: { type: 'date' }, // Date picker
    religion: { type: 'text', placeholder: 'Enter religion' },
    isGovernmentServant: { type: 'select', options: yesNoOptions }, // Dropdown for Yes/No
    hasDisability: { type: 'select', options: yesNoOptions } // Dropdown for Yes/No
  };

  const profileFieldOrder = [
  'fullName (As per CNIC)', 'CNIC (format :12345-7288350-7)', 'email', 'phoneNumber (Format :+923*********)', 'fatherOrHusbandName', 'guardiansName', 
  'relationWithGuardian', 'gender', 'maritalStatus', 'dateOfBirth', 'religion', 
  'isGovernmentServant', 'hasDisability'
];

const educationFieldOrder = [
  'lastDegree', 'degreeType', 'institute', 'country', 'passingYear', 'percentage', 'gradeCGPA'
];


const renderInput = (key) => {
  const setting = inputSettings[key];
  const value = formData[key];
  if (setting.type === 'select') {
    return (
      <select
        id={key}
        name={key}
        value={value || ''}
        onChange={(e) => handleInputChange(key, e.target.value)}
        className="mt-2 px-3 py-2 border rounded-md w-full"
      >
        <option value="">Select</option>
        {setting.options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  } else {
    return (
      <input
        type={setting.type}
        id={key}
        name={key}
        placeholder={setting.placeholder}
        value={value || ''}
        onChange={(e) => handleInputChange(key, e.target.value)}
        className="mt-2 px-3 py-2 border rounded-md w-full"
      />
    );
  }
};
const fieldOrder = [
  'fullName', 'fatherOrHusbandName', 'guardiansName', 'relationWithGuardian',
  'gender', 'maritalStatus', 'dateOfBirth', 'cnic', 'email', 'phoneNumber',
  'religion', 'isGovernmentServant', 'hasDisability'
];

  

  return (
    <div>
      <div className="flex items-center justify-between rounded-lg py-4 px-6" style={{ 
        background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)',
        color: 'white',
        boxSizing: 'border-box'
      }}>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">User Profile Information</h1>
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
            {fieldOrder.map((key, index) => (
              <div key={index} className="mt-4 p-4 shadow-md rounded-md">
                <label htmlFor={key} className="block text-gray-700 text-sm font-bold mb-2">
                  {formatLabel(key.replace(/([A-Z])/g, ' $1').trim())}
                </label>
                {inputSettings[key].type === 'select' ? (
                  <select
                    id={key}
                    name={key}
                    value={formData[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="mt-2 px-3 py-2 border rounded-md w-full"
                  >
                    <option value="">Select</option>
                    {inputSettings[key].options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={inputSettings[key].type}
                    id={key}
                    name={key}
                    placeholder={inputSettings[key].placeholder}
                    value={formData[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="mt-2 px-3 py-2 border rounded-md w-full"
                  />
                )}
              </div>
            ))}
          </form>
  ) : (
    fieldOrder.map((key, index) => (
      <div key={index} className="mt-4 p-4 shadow-md rounded-md">
        <label htmlFor={key} className="block text-gray-700 text-sm font-bold mb-2">
          {formatLabel(key.replace(/([A-Z])/g, ' $1').trim())}
        </label>
        <p className="text-gray-600">{formData[key]}</p>
      </div>
    ))
  )}
</div>
</div>

        {/* Second Column */}
        <div className="flex-1">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800">Upload Documents</h2>
            {uploadSections.map((section, index) => (
              <div key={index} className="mt-4 p-4 rounded-md border border-gray-300">
                <div className="mt-4 w-32 h-32 border border-gray-300">
                  {previewUrls[section.key] && <img src={previewUrls[section.key]} alt="Selected File" className="w-full h-full object-cover" />}
                </div>
                <div className="mt-4 p-4 shadow-md rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col">
                  <label htmlFor={`${section.key}Input`}>{section.label}</label>
                  <input
                    type="file"
                    id={`${section.key}Input`}
                    onChange={(e) => handleFileChange(e, section.key)}
                    accept="image/*"
                    className="mt-2"
                  />
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
    {educationFieldOrder.map((key, index) => (
      <div key={index} className="block text-gray-700 text-sm font-bold mb-2">
        <label htmlFor={key}>{formatLabel(key)}</label>
        <input
          type="text"
          id={key}
          name={key}
          value={eduFormData[key] || ''}
          onChange={handleEducationInputChange}
          className="mt-2 px-3 py-2 border rounded-md w-full"
        />
      </div>
    ))}
  </form>
) : (
  <>
    {educationFieldOrder.map((key, index) => (
     
      <div key={index} className="mt-4 p-4 shadow-md rounded-md text-gray-700 text-sm font-bold" >
        <label htmlFor={key}>{formatLabel(key)}</label>
        <p className="text-gray-600">{eduFormData[key] || ''}</p>
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
            {uploadEduSections.map((section, index) => (
              <div key={index} className="border border-gray-300 mt-4 p-4 rounded-md">
                <div className="mt-4 w-32 h-32 border border-gray-300">
                  {previewUrls[section.key] && <img src={previewUrls[section.key]} alt="Selected File" className="object-cover w-full h-full" />}
                </div>
                <div className="mt-4 p-4 shadow-md rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col">
                  <label htmlFor={`${section.key}Input`}>{section.label}</label>
                  <input
                    type="file"
                    id={`${section.key}Input`}
                    onChange={(e) => handleFileChange(e, section.key)}
                    accept="image/*"
                    className="mt-2"
                  />
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
      {/* Submit Button */}
      <div className="flex justify-center mt-4 p-4">
        <button
          onClick={handleSubmit}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit All
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
