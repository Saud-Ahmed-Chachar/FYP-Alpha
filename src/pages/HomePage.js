import React, { useState } from 'react';
import UniCards from '../components/UniCards';
import ScholarshipCards from '../components/ScholarshipCards';
import Gallery from '../components/Gallery';
import Recommendation from '../components/Recommendation';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleLiveDemoClick = () => {
    window.open('https://www.canva.com/design/DAGHA1mh8EQ/5O9HCqQtlk6fZje9lPjCqA/edit?utm_content=DAGHA1mh8EQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', '_blank');
  };
  return (
    <div className="w-full">
      <div className="pb-16 relative bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex flex-col items-center relative z-10 p-8">
          <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 text-white text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black leading-10">
              Welcome to the best
            </h1>
            <h1 className="text-indigo-700 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">University Recommendation Portal</h1>
            <p className="mt-5 sm:mt-10 lg:w-12/12 font-normal text-sm sm:text-lg">
              A professional and friendly university recommendation portal where you can search, explore, and apply to the best universities in Pakistan.
            </p>
          </div>
          <div className="flex justify-center items-center pb-16 pt-16">
            <button onClick={() => setShowModal(true)} className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold rounded text-white px-2 sm:px-5 border border-indigo-700 py-1 sm:py-2 text-sm">Get Started</button>
        <button
      className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-700 bg-white text-indigo-700 transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold hover:text-indigo-600 rounded border border-white-700 px-2 sm:px-5 py-1 sm:py-2 text-sm"
      onClick={handleLiveDemoClick}
    >
      Live Demo
    </button>

          </div>
        </div>
      </div>

      {showModal && <Recommendation setShowModal={setShowModal} />}
      <div className='flex justify-center'>
        <Gallery />
      </div>

      <UniCards />
      <ScholarshipCards />
      {/* <BlogPosts/>   */}
    </div>
  );
};

export default HomePage;
