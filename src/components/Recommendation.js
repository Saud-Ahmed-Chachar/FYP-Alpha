import React, { useState, useEffect, useRef } from 'react';

const Recommendation = ({ setShowModal }) => {
  const [step, setStep] = useState(1);
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [programsOrMajors, setProgramsOrMajors] = useState('');
  const [locationPreferences, setLocationPreferences] = useState('');
  const [modalContent, setModalContent] = useState({
    title: 'Recommendation',
    description: 'What is your intended field of study?',
    placeholder: 'Enter your field of study',
    buttonText: 'Next'
  });
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

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNext = () => {
    if (step === 1) {
      setFieldOfStudy(modalContent.inputValue);
      setModalContent({
        title: 'Specific Area of Interest',
        description: `What specific area within ${fieldOfStudy} interests you the most?`,
        placeholder: `Enter your area of interest in ${fieldOfStudy}`,
        buttonText: 'Next'
      });
      setStep(step + 1);
    } else if (step === 2) {
      setAreaOfInterest(modalContent.inputValue);
      setModalContent({
        title: 'Programs or Majors',
        description: 'Are there any specific programs or majors you\'re interested in?',
        placeholder: 'Enter your programs or majors of interest',
        buttonText: 'Next'
      });
      setStep(step + 1);
    } else if (step === 3) {
      setProgramsOrMajors(modalContent.inputValue);
      setModalContent({
        title: 'Location Preferences',
        description: 'Do you have any preferences regarding the location of the university?',
        placeholder: 'Enter your location preferences',
        buttonText: 'Finish'
      });
      setStep(step + 1);
    } else {
      setLocationPreferences(modalContent.inputValue);
      // Here you can handle the recommendation based on the collected information
      console.log('Recommendation:', { fieldOfStudy, areaOfInterest, programsOrMajors, locationPreferences });
      closeModal();
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
              <input
                type="text"
                className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder={modalContent.placeholder}
                value={modalContent.inputValue || ''}
                onChange={handleInputChange}
              />
            </div>
            {/* Footer */}
            <div className="p-3 mt-2 text-center space-x-4 md:block">
              <button
                className="mb-2 md:mb-0 bg-indigo-500 border border-indigo-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-600"
                onClick={closeModal}
              >
                Cancel
              </button>
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
    </>
  );
};

export default Recommendation;
