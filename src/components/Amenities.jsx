import React from 'react';

import {
  FaWifi,
  FaSwimmingPool,
  FaConciergeBell,
  FaSpa,
  FaDumbbell,
  FaUtensils,
} from 'react-icons/fa';

const Amenities = () => {
  return (
    <section className="py-16  text-center">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-indigo-700">
          Our Premium Amenities
        </h2>
        <p className="text-gray-600 mt-2">
          Enjoy world-class facilities at UrbanGlow Hotel
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {/* Amenity Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <FaWifi className="text-4xl text-indigo-600 mx-auto mb-3" />
          <h4 className="font-semibold text-lg">Free High-Speed Wi-Fi</h4>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <FaSwimmingPool className="text-4xl text-indigo-600 mx-auto mb-3" />
          <h4 className="font-semibold text-lg">Rooftop Pool</h4>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <FaConciergeBell className="text-4xl text-indigo-600 mx-auto mb-3" />
          <h4 className="font-semibold text-lg">24/7 Concierge</h4>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <FaSpa className="text-4xl text-indigo-600 mx-auto mb-3" />
          <h4 className="font-semibold text-lg">Spa & Wellness</h4>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <FaDumbbell className="text-4xl text-indigo-600 mx-auto mb-3" />
          <h4 className="font-semibold text-lg">Fitness Studio</h4>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <FaUtensils className="text-4xl text-indigo-600 mx-auto mb-3" />
          <h4 className="font-semibold text-lg">In-Room Dining</h4>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
