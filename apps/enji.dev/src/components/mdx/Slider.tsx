/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
// components/Slider.tsx
import clsx from 'clsx';
import NextImage from 'next/image';
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ImageSliderProps {
  images: { src: string; width?: number; height?: number }[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className={clsx('relative')}>
          <NextImage
            src={image.src}
            width={image.width || 800} // default width
            height={image.height || 600} // default height
            className={clsx('rounded-lg')}
            alt={`Slide ${index}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
