import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms/top-rated`)
      .then(res => setRooms(res.data))
      .catch(err => console.error('Failed to load top rooms:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleBookNow = id => {
    navigate(`/rooms/${id}`);
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center py-20"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <section
        className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-12 text-center text-secondary"
        aria-live="polite"
      >
        <h2 className="text-3xl font-bold mb-4 text-accent">Featured Rooms</h2>
        <p>No featured rooms available right now. Please check back soon.</p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-luxury" aria-label="Featured Rooms">
      <h2 className="text-4xl font-extrabold text-center mb-3 text-accent">
        Featured Rooms
      </h2>
      <p className="max-w-3xl mx-auto text-center text-secondary mb-12 text-lg md:text-xl">
        Discover our exclusive selection of rooms tailored to your comfort and
        style.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {rooms.slice(0, 6).map(room => (
          <article
            key={room._id}
            tabIndex={0}
            className="bg-color-bg rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            style={{ minHeight: '450px' }}
            aria-label={`Room titled ${room.title}`}
          >
            <div className="relative h-56 rounded-t-xl overflow-hidden">
              <img
                src={room.image}
                alt={room.title || 'Room image'}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col flex-grow p-6 text-text">
              <h3
                className="text-2xl font-semibold mb-2 truncate"
                title={room.title}
                style={{ color: 'var(--color-highlight)' }}
              >
                {room.title}
              </h3>
              <p className="flex-grow line-clamp-3 mb-4 text-secondary">
                {room.description}
              </p>

              {room.features && room.features.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="bg-accent/20 text-accent text-xs font-medium px-3 py-1 rounded-full select-none"
                      title={feature}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div
                className="flex items-center justify-between font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                <span className="text-xl">${room.price}/night</span>
                <span
                  className="flex items-center gap-1 text-yellow-400"
                  aria-label={`Rating: ${
                    room.rating?.toFixed(1) || 'N/A'
                  } stars`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.39 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L3.602 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.973z" />
                  </svg>
                  {room.rating?.toFixed(1) || 'N/A'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleBookNow(room._id)}
                className="mt-auto btn-luxury focus:outline-none focus:ring-4 focus:ring-accent/50 transition cursor-pointer"
                aria-label={`Book now for ${room.title}`}
              >
                Book Now
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRooms;
