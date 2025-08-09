import React from 'react';
import {
  FaWifi,
  FaSwimmingPool,
  FaConciergeBell,
  FaSpa,
  FaDumbbell,
  FaUtensils,
} from 'react-icons/fa';

const amenities = [
  {
    icon: FaWifi,
    label: 'Free High-Speed Wi-Fi',
    description: 'Stay connected with blazing fast internet.',
  },
  {
    icon: FaSwimmingPool,
    label: 'Rooftop Pool',
    description: 'Relax and enjoy panoramic city views.',
  },
  {
    icon: FaConciergeBell,
    label: '24/7 Concierge',
    description: 'Personal assistance any time you need.',
  },
  {
    icon: FaSpa,
    label: 'Spa & Wellness',
    description: 'Rejuvenate with our exclusive spa treatments.',
  },
  {
    icon: FaDumbbell,
    label: 'Fitness Studio',
    description: 'Keep fit with state-of-the-art equipment.',
  },
  {
    icon: FaUtensils,
    label: 'In-Room Dining',
    description: 'Delicious meals delivered to your room.',
  },
];

const Amenities = () => {
  return (
    <section
      className="py-12 bg-gray-50 text-center"
      aria-labelledby="amenities-heading"
    >
      <div className="mb-10 max-w-3xl mx-auto px-6">
        <h2
          id="amenities-heading"
          className="text-3xl font-extrabold text-indigo-700 mb-2"
        >
          Our Premium Amenities
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Enjoy world-class facilities at UrbanGlow Hotel
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
        {amenities.map(({ icon: Icon, label, description }) => (
          <article
            key={label}
            tabIndex={0}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col items-center cursor-default focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={label}
          >
            <Icon
              className="text-indigo-600 w-10 h-10 mb-3"
              aria-hidden="true"
            />
            <h3 className="text-md font-semibold text-gray-900">{label}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
