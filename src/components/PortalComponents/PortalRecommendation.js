import { React, useState } from 'react';
import Recommendation from '../Recommendation';

const PortalRecommendation = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <div className="flex items-center justify-between rounded-lg py-4 px-6" style={{
        background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)',
        color: 'white',
        boxSizing: 'border-box'
      }}>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Recommendation System</h1>
        </div>
      </div>
      <div className='flex items-center justify-center h-screen p-8'>
        <button onClick={() => setShowModal(true)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Get Started</button>
      </div>
      {showModal && <Recommendation setShowModal={setShowModal} />}
    </div>
  );
};

export default PortalRecommendation;
