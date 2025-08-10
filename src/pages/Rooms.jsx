import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/rooms?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      setRooms(res.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleFilter = e => {
    e.preventDefault();
    fetchRooms();
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-luxury text-luxury transition-colors duration-300">
      <Helmet>
        <title>Rooms | DreamStay</title>
        <meta
          name="description"
          content="Filter rooms by price range and find the perfect stay at DreamStay Hotel."
        />
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-8 text-heading">
        Filter Rooms by Price
      </h1>

      {/* Filter Form */}
      <form
        onSubmit={handleFilter}
        className="max-w-xl mx-auto flex flex-col md:flex-row items-center gap-4 mb-10"
      >
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
          style={{
            color: 'var(--color-text)',
            backgroundColor: 'var(--color-bg)',
          }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
          style={{
            color: 'var(--color-text)',
            backgroundColor: 'var(--color-bg)',
          }}
        />
        <button type="submit" className="btn-luxury w-full md:w-auto">
          Filter
        </button>
      </form>

      {/* Rooms Display */}
      {loading ? (
        <div className="text-center text-lg font-semibold text-accent">
          <span className="loading loading-bars loading-md"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length > 0 ? (
            rooms.map(room => (
              <Link to={`/rooms/${room._id}`} key={room._id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="card bg-luxury shadow-md hover:shadow-lg transition max-w-sm"
                  style={{ color: 'var(--color-text)' }}
                >
                  <figure>
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-60 object-cover"
                    />
                  </figure>
                  <div className="card-body overflow-x-auto">
                    <h2 className="text-xl font-bold whitespace-nowrap text-heading">
                      {room.title}
                    </h2>

                    <p className="text-sm text-subtitle whitespace-nowrap line-clamp-3">
                      {room.description}
                    </p>

                    <p
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      ${room.price}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <p className="col-span-3 text-center text-red-500 text-lg font-semibold">
              No rooms found in this price range.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Rooms;
