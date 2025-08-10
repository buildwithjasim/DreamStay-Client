import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWifi,
  FaSnowflake,
  FaCocktail,
  FaHotTub,
  FaTv,
  FaCoffee,
  FaUtensils,
  FaCheckCircle,
  FaStar,
} from 'react-icons/fa';
import { MdBalcony } from 'react-icons/md';
import AuthContext from '../context/AuthContext';

const useFeatureIcons = () =>
  useMemo(
    () => ({
      WiFi: <FaWifi />,
      'Air Conditioning': <FaSnowflake />,
      Balcony: <MdBalcony />,
      'Mini Bar': <FaCocktail />,
      Jacuzzi: <FaHotTub />,
      TV: <FaTv />,
      'Coffee Maker': <FaCoffee />,
      'Room Service': <FaUtensils />,
    }),
    []
  );

const fetchRoomData = async id => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${id}`);
  const rawRoom = res.data;
  return {
    ...rawRoom,
    price: parseFloat(rawRoom.price?.$numberInt || rawRoom.price),
    rating: parseFloat(rawRoom.rating?.$numberDouble || rawRoom.rating || 0),
    reviews: (rawRoom.reviews || []).map(r => ({
      ...r,
      rating: parseInt(r.rating?.$numberInt || r.rating, 10),
    })),
  };
};

const StarRating = ({ rating }) => {
  const rounded = Math.min(Math.round(rating), 5);
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={
            i < rounded
              ? 'text-[var(--color-accent)]'
              : 'text-[var(--color-secondary)]'
          }
        />
      ))}
    </div>
  );
};

const SkeletonCard = () => (
  <div className="animate-pulse bg-[var(--color-secondary)] rounded-lg h-80 w-full" />
);

const ReviewItem = ({ review }) => (
  <li className="bg-[var(--color-bg)] p-5 rounded-lg shadow-sm border border-[var(--color-secondary)] text-[var(--color-text)]">
    <p className="font-semibold text-lg text-heading">{review.userName}</p>
    <StarRating rating={review.rating} />
    <p className="mt-1 whitespace-pre-line">{review.comment}</p>
  </li>
);

const BookingModal = ({
  room,
  bookingDate,
  setBookingDate,
  error,
  success,
  onCancel,
  onConfirm,
}) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[var(--color-bg)] rounded-lg p-7 max-w-md w-full shadow-lg text-[var(--color-text)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h3 className="text-2xl font-bold mb-5 text-heading">
          Booking Summary
        </h3>
        <p>
          <strong>Room:</strong> {room.title}
        </p>
        <p>
          <strong>Description:</strong> {room.description}
        </p>
        <p className="mb-4">
          <strong>Price:</strong>{' '}
          <span className="font-semibold text-[var(--color-accent)]">
            ${room.price}
          </span>
        </p>

        <label
          htmlFor="booking-date"
          className="block font-semibold mb-2 text-heading"
        >
          Select Booking Date:
        </label>
        <DatePicker
          id="booking-date"
          selected={bookingDate}
          onChange={setBookingDate}
          minDate={new Date()}
          placeholderText="Choose a date"
          className="w-full border border-[var(--color-secondary)] rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-bg)] text-[var(--color-text)]"
        />

        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {success && <p className="text-green-600 font-semibold">{success}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-luxury" onClick={onConfirm}>
            Confirm Booking
          </button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default function RoomDetails() {
  const { id } = useParams();
  const { user, loading, token } = useContext(AuthContext);
  const featureIcons = useFeatureIcons();

  const [room, setRoom] = useState(null);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [bookingDate, setBookingDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const reviewsRef = useRef(null);

  const loadRoom = useCallback(async () => {
    try {
      setLoadingRoom(true);
      const data = await fetchRoomData(id);
      setRoom(data);
    } catch {
      setError('Failed to load room data.');
    } finally {
      setLoadingRoom(false);
    }
  }, [id]);

  useEffect(() => {
    loadRoom();
  }, [loadRoom]);

  const scrollToReviews = () =>
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleBooking = async () => {
    if (!bookingDate) return setError('Please select a booking date.');
    if (!user) return setError('You must be logged in to book.');

    const confirm = await Swal.fire({
      title: 'Confirm Booking?',
      text: `Book this room on ${bookingDate.toDateString()}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-accent)',
      cancelButtonColor: '#d33',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/rooms/${id}/book`,
        { bookingDate: bookingDate.toISOString().split('T')[0] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.message);
      setIsModalOpen(false);
      loadRoom();
      setBookingDate(null);
      Swal.fire({ icon: 'success', title: 'Booking Confirmed!' });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
    }
  };

  if (loading || loadingRoom) {
    return (
      <div className="max-w-5xl mx-auto px-4 mt-10 space-y-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Room not found.
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto mt-14 px-4 py-10 bg-luxury text-luxury rounded-lg transition-colors duration-300">
      {/* Room Overview */}
      <section className="flex flex-col lg:flex-row gap-8">
        <img
          src={room.image}
          alt={room.title}
          className="w-full lg:w-1/2 rounded-lg shadow-lg h-80 object-cover"
        />
        <article className="flex-1 flex flex-col justify-between">
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-heading">
              {room.title}
            </h1>
            <p className="text-subtitle mb-5">{room.description}</p>
            <div className="flex flex-wrap gap-6 mb-6 text-subtitle">
              <p>
                <strong>Type:</strong> {room.roomType}
              </p>
              <p>
                <strong>Size:</strong> {room.roomSize}
              </p>
              <p className="text-[var(--color-accent)] text-xl font-semibold">
                ${room.price}
              </p>
              <p className="flex items-center gap-1 text-[var(--color-accent)] font-semibold">
                Rating: {room.rating} <FaStar />
              </p>
            </div>
          </header>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-heading">
              Features
            </h2>
            <ul className="flex flex-wrap gap-4">
              {room.features?.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 bg-[var(--color-secondary)] bg-opacity-20 px-4 py-2 rounded-md shadow-sm text-[var(--color-text)]"
                >
                  <span className="text-[var(--color-highlight)]">
                    {featureIcons[f] || <FaCheckCircle />}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-6 flex gap-4 flex-wrap">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`btn-luxury px-6 py-3 font-semibold rounded-md shadow-lg ${
                room.availability !== 'Available'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[var(--color-highlight)]'
              }`}
              disabled={room.availability !== 'Available'}
            >
              {room.availability === 'Available' ? 'Book Now' : 'Unavailable'}
            </button>
            <button
              onClick={scrollToReviews}
              className="btn btn-outline btn-secondary px-6 py-3 rounded-md shadow-lg hover:bg-gray-200 text-[var(--color-text)]"
            >
              View Reviews
            </button>
          </footer>
        </article>
      </section>

      {/* Reviews */}
      <section className="mt-14" ref={reviewsRef}>
        <h2 className="text-3xl font-bold mb-6 text-heading">Reviews</h2>
        {room.reviews?.length ? (
          <ul className="space-y-5">
            {room.reviews.map((r, i) => (
              <ReviewItem key={i} review={r} />
            ))}
          </ul>
        ) : (
          <p className="text-subtitle italic">No reviews yet.</p>
        )}
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal
          room={room}
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          error={error}
          success={success}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleBooking}
        />
      )}
    </main>
  );
}
