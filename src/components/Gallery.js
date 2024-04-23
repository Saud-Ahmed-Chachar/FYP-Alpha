import React, { useState, useEffect } from 'react';
import { SfScrollable, SfButton, SfIconChevronLeft, SfIconChevronRight } from '@storefront-ui/react';
import classNames from 'classnames';

const ads = [
    {
        university: "Sukkur IBA University",
        admission_info: "Admissions are now open for the upcoming semester. Please visit our website for more information.",
        deadline: "2024-08-31",
        visit_link: "https://www.applyadmission.iba-suk.edu.edu",
        image: "https://pbs.twimg.com/media/FExtnZZXoAUIZCk?format=jpg&name=4096x4096"
    },
    {
        university: "NED University of Engineering and Technology",
        admission_info: "Admissions are now open for the upcoming semester. Please visit our website for more information.",
        deadline: "2024-08-31",
        visit_link: "https://www.applyadmission.ned.edu.edu",
        image: "https://pbs.twimg.com/media/FExtnZZXoAUIZCk?format=jpg&name=4096x4096"
    },
    {
        university: "Mehran University",
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
        <div className="flex">
             <div className="w-1/4 p-4 ">
                <div className="container mx-auto mt-10 pt-8 pr-8 " style={{ width: '300px', height: '600px' }}>
                    {ads[activeIndex] && (
                        <>
                            <h1 className='font-bold'> {ads[activeIndex].university}</h1>
                            <br />
                            {ads[activeIndex].admission_info}
                            <br />
                            Deadline: {ads[activeIndex].deadline}
                            <br />
                            Visit Link: <a href={ads[activeIndex].visit_link} target="_blank" rel="noopener noreferrer">{ads[activeIndex].visit_link}</a>
                        </>
                    )}
                </div>
            </div>
            <div className="w-3/4 p-4">
                <div className="container mt-10 p-4" style={{ width: '750px', height: '600px' }}>
                    <div className="relative flex flex-col w-full max-h-[600px] aspect-[4/3]">
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
                            {ads.map(({ image, university }, index) => (
                                <button
                                    type="button"
                                    aria-label={university}
                                    aria-current={activeIndex === index}
                                    key={`${university}-${index}-thumbnail`}
                                    className={classNames(
                                        'md:w-14 md:h-auto relative shrink-0 pb-1 my-2 -mr-2 border-b-4 snap-start cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0',
                                        activeIndex === index ? 'border-primary-700' : 'border-transparent'
                                    )}
                                    onClick={() => setActiveIndex(index)}
                                    onKeyDown={(event) => activeArrowNavigation(event, index)}
                                >
                                    <img alt={university} className="object-contain border border-neutral-200" width="30" height="30" src={image} />
                                </button>
                            ))}
                        </SfScrollable>

                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default Gallery;
