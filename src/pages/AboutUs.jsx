import React from 'react';
import { FaHotel, FaUsers, FaStar, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-14 px-6 max-w-7xl mx-auto mt-14 bg-luxury text-luxury transition-colors duration-300">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold text-heading mb-4">
          About DreamStay
        </h2>
        <p className="text-subtitle text-lg">
          DreamStay is your go-to platform for seamless hotel booking. We offer
          a curated selection of luxurious rooms and suites with real-time
          availability, easy booking management, and honest guest reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {[
          {
            icon: <FaHotel className="text-5xl text-accent mx-auto mb-4" />,
            title: 'Wide Selection',
            desc: 'Choose from a variety of rooms & suites tailored to every traveler’s needs.',
          },
          {
            icon: <FaUsers className="text-5xl text-accent mx-auto mb-4" />,
            title: 'Trusted by Guests',
            desc: 'Thousands of happy customers rely on DreamStay for smooth and secure bookings.',
          },
          {
            icon: <FaStar className="text-5xl text-accent mx-auto mb-4" />,
            title: 'Real Reviews',
            desc: 'Read honest reviews from guests to make informed decisions.',
          },
          {
            icon: <FaGlobe className="text-5xl text-accent mx-auto mb-4" />,
            title: 'Global Reach',
            desc: 'Book rooms at the best hotels worldwide with ease and confidence.',
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="p-6 border border-[var(--color-secondary)] rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            {icon}
            <h3 className="text-xl font-semibold mb-2 text-heading">{title}</h3>
            <p className="text-subtitle">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
