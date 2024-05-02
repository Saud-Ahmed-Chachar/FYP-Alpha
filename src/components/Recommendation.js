import React, { useState, useEffect, useRef } from 'react';
import universityData from './universities_data.json';

const Recommendation = ({ setShowModal }) => {
  const [step, setStep] = useState(1);
  const [program, setProgram] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [sector, setSector] = useState('');

  const [modalContent, setModalContent] = useState({
    title: 'Recommendation',
    description: 'What specific province do you want to study?',
    placeholder: 'Select the Province',
    buttonText: 'Next'
  });
  
  const [matchingUniversities, setMatchingUniversities] = useState([]);

  const [showResultModal, setShowResultModal] = useState(false);
  
  const [citiesForProvince, setCitiesForProvince] = useState({});
  
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    // Generate a map of provinces to their respective cities
    const citiesMap = {};
    universityData.forEach(university => {
      const province = university.Province;
      const city = university.City;
      if (province && city) {
        if (!citiesMap[province]) {
          citiesMap[province] = [];
        }
        if (!citiesMap[province].includes(city)) {
          citiesMap[province].push(city);
        }
      }
    });
    setCitiesForProvince(citiesMap);
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setShowResultModal(false); // Close result modal if it's open
  };

  useEffect(() => {
    // Filter universities whenever any dropdown value changes
    filterUniversities();
  }, [program, city, department, sector]);

  const filterUniversities = () => {
    let filteredUniversities = universityData.filter(university => {
      // Compare other fields first
      return (
        (program === '' || university.Province === program) &&
        (city === '' || university.City === city) &&
        (sector === '' || university.Sector === sector)
      );
    });
  
    if (step === 3 && department.trim() !== '') {
      filteredUniversities = filteredUniversities.filter(university => {
        if (university.departments && Array.isArray(university.departments)) {
          // Check if any of the selected departments are offered by the university
          return department.split(',').some(selectedDept => university.departments.includes(selectedDept.trim()));
        } else if (university.departments && typeof university.departments === 'string') {
          // If departments is a single program, compare directly
          return university.departments === department;
        }
        return false; // Exclude the university if no departments are available
      });
    }
  
    setMatchingUniversities(filteredUniversities);
    console.log(filteredUniversities);
  };
  
  

   

  const handleNext = () => {
    if (step === 1) {
      setProgram(modalContent.inputValue);
      setModalContent({
        title: 'Location Preferences',
        description: 'Do you have any preferences regarding the location of the university?',
        placeholder: 'Enter your location preferences',
        buttonText: 'Next',
        inputValue: '' 
      });
      setStep(step + 1);
    } else if (step === 2) {
      setCity(modalContent.inputValue);
      setModalContent({
        title: 'Programs or Majors',
        description: 'Are there any specific programs or majors you\'re interested in?',
        placeholder: 'Enter your programs or majors of interest',
        buttonText: 'Next',
        inputValue: '' // Reset the inputValue after setting city
      });
      setStep(step + 1);
    } else if (step === 3) {
      setDepartment(modalContent.inputValue);
      setModalContent({
        title: 'Sector',
        description: 'Do you have any preferences regarding sector?',
        placeholder: 'Select the Sector',
        buttonText: 'Next',
        inputValue: '' // Reset the inputValue after setting department
      });
      setStep(step + 1);
    } else if (step === 4) {
      setSector(modalContent.inputValue);
      setModalContent({
        title: 'Finish',
        description: 'Do you want to finish?',
        placeholder: 'View recommendations',
        buttonText: 'Finish',
        inputValue: '' // Reset the inputValue after setting sector
      });
      filterUniversities(); // Filter universities before displaying them
      setStep(step + 1);
    
    } 
    
    else if(step === 5) {
      setShowResultModal(true);
      setStep(step + 1);
    }
    else{
 closeModal();
    }
   
   
  };


  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      // Reset the modal content to the previous step's content
      if (step === 2) {
        setModalContent({
          title: 'Recommendation',
          description: 'What is your intended field of study?',
          placeholder: 'Enter your field of study',
          buttonText: 'Next'
        });
      } else if (step === 3) {
        setModalContent({
          title: 'Specific Area of Interest',
          description: `What specific area within  interests you the most?`,
          placeholder: `Enter your area of interest in `,
          buttonText: 'Next'
        });
      } else if (step === 4) {
        setModalContent({
          title: 'Programs or Majors',
          description: 'Are there any specific programs or majors you\'re interested in?',
          placeholder: 'Enter your programs or majors of interest',
          buttonText: 'Next'
        });
      }
    }
  };

  const handleInputChange = (e) => {
    setModalContent({ ...modalContent, inputValue: e.target.value });
  };

  return (
    <>
      <div
        className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-80 inset-0 z-0 backdrop-blur-sm"></div>
        <div
          ref={modalRef}
          className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        >
          {/* Content */}
          <div className="">
            {/* Body */}
            <div className="text-center p-5 flex-auto justify-center">
              <h2 className="text-xl font-bold py-4">{modalContent.title}</h2>
              <p className="text-sm text-gray-500 px-8">
                {modalContent.description}
              </p>
              {step === 1 && (
                <>
                  <select
                    className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    onChange={handleInputChange}
                  >
                    <option value="">Select Province</option>
                    {Object.keys(citiesForProvince).map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  
                </>
              )}
              {step === 2 && (
                <>
                  <p className="text-sm text-gray-500 px-8">
                    Preferred City
                  </p>
                  <select
                    className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    {citiesForProvince[program] && citiesForProvince[program].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  
                </>
              )}
              {step === 3 && (
                <div>
                  <p className="text-sm text-gray-500 px-8">
                    Specific Field of Interest
                  </p>
                  <select
                    className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    onChange={handleInputChange}
                  >
                    <option value="">Select Specific field of interest</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Law">Law</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Design">Design</option>
                    <option value="Fine Arts">Fine Arts</option>
                  </select>
                </div>
              )}
              {step === 4 && (
                <div>
                  <p className="text-sm text-gray-500 px-8">
                    Sector Preferences
                  </p>
                  <select
                    className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sector</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    
                  </select>
                </div>
              )}
              {showResultModal && (
                <div className="mt-8 overflow-y-auto max-h-80">
                  <h2 className="text-2xl font-bold mb-4">Matching Universities</h2>
                  {matchingUniversities.map((university, index) => (
                    <div key={index} className="border rounded-md p-4 mb-4 flex items-center">
                      <img src={university.Image} alt="University Logo" className="w-20 h-20 mr-4" />
                      <div>
                        <h3 className="text-xl font-bold">{university["University Name"]}</h3>
                  
                        <p className="text-sm text-gray-500">City: {university.City}</p>
                        <p className="text-sm text-gray-500">Province: {university.Province}</p>
                        <a href={university.University_URL} className="text-sm text-blue-500 hover:underline">Visit University</a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {/* Footer */}
            <div className="p-3 mt-2 text-center space-x-4 md:block">
              {step === 1 && (
                <button
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              )}
              {step > 1 && (
                <button
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
              <button
                className="mb-2 md:mb-0 bg-indigo-500 border border-indigo-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-600"
                onClick={handleNext}
              >
                {modalContent.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>        
    </>
  );
};

export default Recommendation;
