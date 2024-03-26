import { useState, useEffect } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

import img1 from "./../images/uni1.jpg";
import img2 from "./../images/uni2.jpg";
import img3 from "./../images/uni3.jpg";
import img4 from "./../images/uni4.jpg";

export default function CarouselExample() {
  const [current, setCurrent] = useState(0);
  const slides = [img1, img2, img3, img4];

  const previousSlide = () => {
    setCurrent((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrent((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Interval time in milliseconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="pt-12 pb-12 carousel-container mx-auto w-full" style={{ maxWidth: '900px', maxHeight: 'px' }}>
      <div className="relative overflow-hidden" style={{ width: '100%', height: '100%' }}>
        <div
          className="flex transition ease-out duration-500"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
            width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((slide, index) => (
            <img key={index} src={slide} alt={`slide${index}`} className="w-full h-auto" style={{ maxWidth: '800px', height: '500px' }} />
          ))}
        </div>

        <div className="absolute top-0 left-0 h-full w-full flex justify-between items-center px-4">
          <button onClick={previousSlide} className="text-white text-3xl focus:outline-none">
            <BsFillArrowLeftCircleFill />
          </button>
          <button onClick={nextSlide} className="text-white text-3xl focus:outline-none">
            <BsFillArrowRightCircleFill />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full w-3 h-3 mx-1 cursor-pointer ${
                index === current ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
