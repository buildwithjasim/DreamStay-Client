import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms/top-rated`)
      .then(res => setRooms(res.data))
      .catch(err => console.error('Failed to load top rooms:', err));
  }, []);

  const handleBookNow = id => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Featured Rooms</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.slice(0, 6).map(room => (
          <div
            key={room._id}
            className="border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{room.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {room.description}
            </p>
            <ul className="flex flex-wrap gap-2 text-sm text-gray-500 mt-2">
              {room.features?.map((feature, idx) => (
                <li
                  key={idx}
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded"
                >
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-auto pt-4">
              <span className="text-lg font-bold text-rose-600">
                ${room.price}/night
              </span>
              <span className="text-yellow-500 font-semibold">
                ⭐ {room.rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <button
              onClick={() => handleBookNow(room._id)}
              className="mt-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
