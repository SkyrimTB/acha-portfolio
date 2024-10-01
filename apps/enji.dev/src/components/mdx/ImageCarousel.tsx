/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */

/* eslint-disable react/jsx-props-no-spreading */
import clsx from 'clsx';
import NextImage from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface ImageItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ImageCarouselProps = {
  images: ImageItem[];
  immersive?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
};

export default function ImageCarousel({
  images,
  immersive = true,
  autoPlay = true,
  interval = 5000,
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, images.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setDragging(false);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round(
        carouselRef.current.scrollLeft / carouselRef.current.offsetWidth
      );
      setCurrentIndex(index);
    }
  };

  return (
    <div className={clsx('mdx-image relative overflow-hidden', className)}>
      {immersive && images[currentIndex] ? (
        <div
          style={{ backgroundImage: `url(${images[currentIndex].src})` }}
          className={clsx(
            'absolute -inset-8 z-[-1] rounded-[20%] bg-[length:180%_180%] bg-center opacity-25 blur-2xl',
            'hidden',
            'dark:block'
          )}
        />
      ) : null}
      <div
        ref={carouselRef}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
        style={{ scrollSnapType: 'x mandatory' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex w-full flex-shrink-0 snap-center items-center justify-center"
          >
            <div
              className="relative"
              style={{ width: `${image.width}px`, height: `${image.height}px` }}
            >
              <NextImage
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="contain"
                className={clsx(
                  'border-divider-light rounded-lg border',
                  'dark:border-divider-dark'
                )}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-full bg-blue-400 transition-all duration-300 ease-in-out"
          style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
