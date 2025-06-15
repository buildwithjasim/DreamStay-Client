import React from 'react';

export default function WhyChoseUs() {
  return (
    <section className="py-16 text-center ">
      <h2 className="text-4xl font-bold mb-10 text-indigo-600">
        Why Choose DreamStay?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        <div className="card bg-base-200 shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-primary">
            Luxury Comfort
          </h3>
          <p>
            Experience a premium stay with elegant rooms and top-tier amenities.
          </p>
        </div>
        <div className="card bg-base-200 shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-primary">
            Verified Guest Reviews
          </h3>
          <p>All reviews are from real guests who have stayed in the hotel.</p>
        </div>
        <div className="card bg-base-200 shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-primary">
            Secure & Easy Booking
          </h3>
          <p>
            Fast, reliable, and secure online booking using modern technology.
          </p>
        </div>
      </div>
    </section>
  );
}
