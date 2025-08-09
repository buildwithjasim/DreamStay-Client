import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 'slide1',
    bgImage: 'https://i.ibb.co/TDfHfg2s/banner1.jpg',
    title: 'Welcome to DreamStay',
    subtitle:
      'Discover your perfect stay with top-rated rooms and luxury service.',
    btnText: 'Explore Rooms',
    btnLink: '/rooms',
    titleColor: 'white',
    subtitleColor: 'white',
  },
  {
    id: 'slide2',
    bgImage: 'https://i.ibb.co/N28vSpDp/room8.png', // fixed broken URL
    title: 'Modern Rooms & Comfort',
    subtitle: 'Experience a luxury stay tailored to your comfort and style.',
    btnText: 'Explore Rooms',
    btnLink: '/rooms',
    titleColor: 'white',
    subtitleColor: 'white',
  },
  {
    id: 'slide3',
    bgImage: 'https://i.ibb.co/5Wxnr3Nv/banner4.jpg',
    title: 'Book. Relax. Enjoy.',
    subtitle: 'Easy online booking with amazing deals & special offers.',
    btnText: 'Explore Rooms',
    btnLink: '/rooms',
    titleColor: 'white',
    subtitleColor: 'white',
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <section
      className="relative w-full h-[70vh] max-h-[600px] overflow-hidden mt-16 "
      aria-label="Homepage Hero Section"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${slides[current].bgImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-opacity-60"></div>

          {/* Content Container */}
          <div className="relative flex flex-col justify-center items-center h-full text-center px-6 sm:px-12 md:px-20 max-w-5xl mx-auto">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg"
              style={{ color: slides[current].titleColor }}
            >
              {slides[current].title}
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 drop-shadow-md"
              style={{ color: slides[current].subtitleColor }}
            >
              {slides[current].subtitle}
            </p>
            <Link
              to={slides[current].btnLink}
              className="btn btn-primary px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition"
            >
              {slides[current].btnText}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 text-white w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 text-white w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-4 h-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition ${
              index === current
                ? 'bg-primary'
                : 'bg-white bg-opacity-50 hover:bg-opacity-80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
