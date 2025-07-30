import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import {
  FaWifi,
  FaSnowflake,
  FaCocktail,
  FaHotTub,
  FaTv,
  FaCoffee,
  FaUtensils,
  FaCheckCircle,
} from 'react-icons/fa';
import { MdBalcony } from 'react-icons/md';
import AuthContext from '../context/AuthContext';

const featureIcons = {
  WiFi: <FaWifi />,
  'Air Conditioning': <FaSnowflake />,
  Balcony: <MdBalcony />,
  'Mini Bar': <FaCocktail />,
  Jacuzzi: <FaHotTub />,
  TV: <FaTv />,
  'Coffee Maker': <FaCoffee />,
  'Room Service': <FaUtensils />,
};

const RoomDetails = () => {
  const { id } = useParams();
  const { user, loading, token } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [bookingDate, setBookingDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      setLoadingRoom(true);
      setError('');
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/rooms/${id}`
        );
        const rawRoom = res.data;

        const roomData = {
          ...rawRoom,
          price: parseInt(rawRoom.price?.$numberInt || rawRoom.price),
          rating: parseFloat(rawRoom.rating?.$numberDouble || rawRoom.rating),
          reviews: (rawRoom.reviews || []).map(review => ({
            ...review,
            rating: parseInt(review.rating?.$numberInt || review.rating),
          })),
        };

        setRoom(roomData);
      } catch (err) {
        setError('Failed to load room data.');
      } finally {
        setLoadingRoom(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBooking = async () => {
    if (!bookingDate) {
      setError('Please select a booking date.');
      setSuccess('');
      return;
    }

    if (!user) {
      setError('You must be logged in to book a room.');
      setSuccess('');
      return;
    }

    // SweetAlert2: Confirm Booking Dialog
    const result = await Swal.fire({
      title: 'Confirm Booking?',
      text: `Do you want to book this room on ${bookingDate.toDateString()}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Book it!',
    });

    if (!result.isConfirmed) return;

    // Reset messages
    setError('');
    setSuccess('');

    try {
      // Booking request
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/rooms/${id}/book`,
        { bookingDate: bookingDate.toISOString().split('T')[0] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(res.data.message);
      setIsModalOpen(false);

      // Fetch updated room data
      const updatedRoom = await axios.get(
        `${import.meta.env.VITE_API_URL}/rooms/${id}`
      );
      const rawRoom = updatedRoom.data;

      const roomData = {
        ...rawRoom,
        price: parseInt(rawRoom.price?.$numberInt || rawRoom.price),
        rating: parseFloat(rawRoom.rating?.$numberDouble || rawRoom.rating),
        reviews: (rawRoom.reviews || []).map(review => ({
          ...review,
          rating: parseInt(review.rating?.$numberInt || review.rating),
        })),
      };

      setRoom(roomData);
      setBookingDate(null);

      // SweetAlert2: Success Message
      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed!',
        text: 'Your room has been booked successfully.',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
      setSuccess('');
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: err.response?.data?.message || 'Booking failed.',
      });
    }
  };

  if (loading || loadingRoom)
    return <div className="text-center mt-10">Loading...</div>;
  if (!room)
    return <div className="text-center text-red-500 mt-10">Room not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={room.image}
          alt={room.title}
          className="w-full lg:w-1/2 rounded-lg shadow-lg h-80 object-cover"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 text-[#ffc107]">
            {room.title}
          </h2>
          <p className="text-gray-700 mb-4">{room.description}</p>
          <p className="text-lg text-gray-500 mb-2">
            Room Type: {room.roomType}
          </p>
          <p className="text-lg text-gray-500 mb-2">Size: {room.roomSize}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            ${room.price}
          </p>
          <p className="text-yellow-500 font-medium mb-4">
            Rating: {room.rating}⭐
          </p>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
            <div className="flex flex-wrap gap-3">
              {room.features?.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded shadow-sm text-sm"
                >
                  <span className="text-blue-500">
                    {featureIcons[feature] || <FaCheckCircle />}
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
            disabled={room.availability !== 'Available'}
            title={
              room.availability === 'Available'
                ? 'Book this room'
                : 'Room is unavailable'
            }
          >
            {room.availability === 'Available' ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Reviews:</h3>
        {room.reviews?.length ? (
          <div className="space-y-4">
            {room.reviews.map((review, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded">
                <p className="font-semibold">{review.userName}</p>
                <p className="text-sm text-gray-600">
                  Rating: {review.rating}⭐
                </p>
                <p className="mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No reviews available for this room yet.
          </p>
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
            <p>
              <strong>Room:</strong> {room.title}
            </p>
            <p>
              <strong>Description:</strong> {room.description}
            </p>
            <p>
              <strong>Price:</strong> ${room.price}
            </p>
            <div className="my-4">
              <label className="block font-medium mb-1">
                Select Booking Date:
              </label>
              <DatePicker
                selected={bookingDate}
                onChange={date => setBookingDate(date)}
                minDate={new Date()}
                className="w-full border px-3 py-2 rounded"
                placeholderText="Choose a date"
              />
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleBooking}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
