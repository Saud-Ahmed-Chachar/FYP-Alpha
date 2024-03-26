import React, { useState, useEffect } from 'react';
import { SfScrollable, SfButton, SfIconChevronLeft, SfIconChevronRight } from '@storefront-ui/react';
import classNames from 'classnames';

import img1 from "./../images/uni1.jpg";
import img2 from "./../images/uni2.jpg";
import img3 from "./../images/uni3.jpg";
import img4 from "./../images/uni4.jpg";

const images = [
    { imageSrc: img1, alt: 'uni1' },
    { imageSrc: img2, alt: 'uni2' },
    { imageSrc: img3, alt: 'uni3' },
    { imageSrc: img4, alt: 'uni4' },
];

const Gallery = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const onDragged = (event) => {
        if (event.swipeRight && activeIndex > 0) {
            setActiveIndex((currentActiveIndex) => currentActiveIndex - 1);
        } else if (event.swipeLeft && activeIndex < images.length - 1) {
            setActiveIndex((currentActiveIndex) => currentActiveIndex + 1);
        }
    };

    const activeArrowNavigation = (event, index) => {
        event.preventDefault();
        const currentElement = event?.target;
        const nextElement = currentElement.nextElementSibling;
        const previousElement = currentElement.previousElementSibling;

        if ((event.code === 'ArrowRight' || event.code === 'ArrowUp') && index < images.length - 1) {
            setActiveIndex(index + 1);
            nextElement.focus();
        } else if ((event.code === 'ArrowLeft' || event.code === 'ArrowDown') && index > 0) {
            setActiveIndex(index - 1);
            previousElement.focus();
        }
    };

    return (
        <div className="container mx-auto mt-10 p-4">
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
                {images.map(({ imageSrc, alt }, index) => (
                    <div key={`${alt}-${index}`} className="flex justify-center justify-content-center h-full basis-full shrink-0 grow snap-center">
                        <img aria-label={alt} aria-hidden={activeIndex !== index} className="w-auto h-auto max-w-full max-h-full" alt={alt} src={imageSrc} style={{ padding: '20px' }} />
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
    {images.map(({ imageSrc, alt }, index) => (
        <button
            type="button"
            aria-label={alt}
            aria-current={activeIndex === index}
            key={`${alt}-${index}-thumbnail`}
            className={classNames(
                'md:w-14 md:h-auto relative shrink-0 pb-1 my-2 -mr-2 border-b-4 snap-start cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0',
                activeIndex === index ? 'border-primary-700' : 'border-transparent'
            )}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => activeArrowNavigation(event, index)}
        >
            <img alt={alt} className="object-contain border border-neutral-200" width="78" height="78" src={imageSrc} />
        </button>
    ))}
</SfScrollable>

        </div>  
            </div>
    );
};

export default Gallery;
