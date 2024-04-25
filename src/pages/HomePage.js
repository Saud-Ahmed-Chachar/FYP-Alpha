import {React, useState} from 'react';
import UniCards from '../components/UniCards';
import ScholarshipCards from '../components/ScholarshipCards';
import Gallery from '../components/Gallery';
import BlogPosts from '../components/BlogPosts';
import Recommendation from '../components/Recommendation';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    
    <div className="w-full">
      <div className="bg-gray-100 pt-8">
                    <div className="container mx-auto flex flex-col items-center">
                        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                            <h1 className="text-1xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-gray-800 font-black leading-7 md:leading-10">
                                Welcome to the best
                    
                                <h1 className="text-indigo-700 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">University Recommendation Portal</h1>
                                
                            </h1>
                            <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
                                A professonal and friendly a university recommendation
                                portal where you can search, explore, apply in the   
                                  best university of Pakistan. </p>
                        </div>
                        <div className="flex justify-center items-center">
                        <button onClick={() => setShowModal(true)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Get Started</button>
                            <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">Live Demo</button>
                        </div>
                    </div>
                </div>
                {showModal && <Recommendation setShowModal={setShowModal} />}
                <div className='flex justify-center'>
                <Gallery/>
                </div>
            
                <UniCards/>
                <ScholarshipCards/>
                <BlogPosts/>  

      
    </div>
  );
};

export default HomePage;
