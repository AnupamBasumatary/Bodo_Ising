import React, { useState, useEffect } from 'react';
import { CarouselData } from './CarouselData';

import './style/carousel.css';

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // const nextSlide = () => {
  //   setCurrent(current === length - 1 ? 0 : current + 1);
  // };

  // const prevSlide = () => {
  //   setCurrent(current === 0 ? length - 1 : current - 1);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
      }
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [current, length, slides]);

  return (
    <section className='slider'>
      {CarouselData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='Food Carousel' className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Carousel;
