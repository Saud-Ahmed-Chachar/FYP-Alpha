import React, { useState, useEffect } from 'react';
import { SfScrollable, SfButton, SfIconChevronLeft, SfIconChevronRight } from '@storefront-ui/react';
import classNames from 'classnames';

const ads = [
  {
    university: "Sukkur IBA University, Sukkur",
    admission_info: "Admissions are now open for the upcoming semester. Please visit our website for more information.",
    deadline: "2024-08-31",
    visit_link: "https://www.applyadmission.iba-suk.edu.edu",
    image: "https://pbs.twimg.com/media/FExtnZZXoAUIZCk?format=jpg&name=4096x4096"
  },
  {
    university: "NED University of Engineering and Technology, Karachi",
    admission_info: "Admissions are now open for the upcoming semester. Please visit our website for more information.",
    deadline: "2024-08-31",
    visit_link: "https://www.applyadmission.ned.edu.edu",
    image: "https://www.neduet.edu.pk/sites/default/files/users/registrar_department/Undergrad%20Admission/2024/Undergrad%20%20Ad%202024.jpeg"
  },
  {
    university: "Mehran University of Engineering and Technology, Jamshoro",
    admission_info: "Admissions are now open for the upcoming semester. Please visit our website for more information.",
    deadline: "2024-08-31",
    visit_link: "https://www.applyadmission.iba-suk.edu.edu",
    image: "https://www.eduvision.edu.pk/admissions/mehran-university-of-engineering-&-technology-jamshoro-admission-14-4-24.webp"
  }
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === ads.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const onDragged = (event) => {
    if (event.swipeRight && activeIndex > 0) {
      setActiveIndex((currentActiveIndex) => currentActiveIndex - 1);
    } else if (event.swipeLeft && activeIndex < ads.length - 1) {
      setActiveIndex((currentActiveIndex) => currentActiveIndex + 1);
    }
  };

  const activeArrowNavigation = (event, index) => {
    event.preventDefault();
    const currentElement = event?.target;
    const nextElement = currentElement.nextElementSibling;
    const previousElement = currentElement.previousElementSibling;

    if ((event.code === 'ArrowRight' || event.code === 'ArrowUp') && index < ads.length - 1) {
      setActiveIndex(index + 1);
      nextElement.focus();
    } else if ((event.code === 'ArrowLeft' || event.code === 'ArrowDown') && index > 0) {
      setActiveIndex(index - 1);
      previousElement.focus();
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="my-4 p-4 text-3xl font-bold">Open Admissions</h1>
      <div className="relative flex flex-wrap">
        {/* Image Section */}
        <div className="w-full md:w-2/4 ">
          <div className="container" style={{ width: '100%' }}>
            <div className="relative flex flex-col w-full max-h-full aspect-[4/3]">
              <SfScrollable
                className="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                activeIndex={activeIndex}
                wrapperClassName="h-full min-h-0"
                buttonsPlacement="none"
                isActiveIndexCentered={true}
                drag={{ containerWidth: true }}
                onDragEnd={onDragged}
              >
                {ads.map(({ image, university }, index) => (
                  <div key={`${university}-${index}`} className="flex justify-center justify-content-center h-full basis-full shrink-0 grow snap-center">
                    <img aria-label={university} aria-hidden={activeIndex !== index} className="w-auto h-auto max-w-full max-h-full" alt={university} src={image} style={{ padding: '20px' }} />
                  </div>
                ))}
              </SfScrollable>
              <SfScrollable
                className="items-center justify-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                activeIndex={activeIndex}
                buttonsPlacement="floating"
                slotPreviousButton={
                  <SfButton className="absolute disabled:hidden !rounded-full z-10 left-4 bg-white" variant="secondary" size="sm" square={true} slotPrefix={<SfIconChevronLeft size="sm" />} />
                }
                slotNextButton={
                  <SfButton className="absolute disabled:hidden !rounded-full z-10 right-4 bg-white" variant="secondary" size="sm" square={true} slotPrefix={<SfIconChevronRight size="sm" />} />
                }
              >
              </SfScrollable>
            </div>
          </div>
        </div>
        {/* Info Section */}
        <div className="w-full md:w-2/4 p-4">
          <div className="container mx-auto bottom-0  bg-opacity-70 rounded-lg p-4">
            {ads[activeIndex] && (
              <>
                <h1 className='text-sm font-bold mb-2 '>{ads[activeIndex].university}</h1>
                <p className="text-xs mb-1 ">{ads[activeIndex].admission_info}</p>
                <p className="text-xs mb-1 ">
                  <span className="font-bold">Deadline:</span> {ads[activeIndex].deadline}
                </p>
                <p className="text-xs mb-1 ">
                  <span className="font-bold">Visit Link:</span>{' '}
                  <a href={ads[activeIndex].visit_link} target="_blank" rel="noopener noreferrer" className="text-indigo-700">
                    {ads[activeIndex].visit_link}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
