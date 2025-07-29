import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/rooms/${id}`);
        setRoom(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load room data.');
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBooking = async () => {
    if (!bookingDate) return setError('Please select a booking date.');
    setError('');
    setSuccess('');
    try {
      const res = await axios.post(`http://localhost:3000/rooms/${id}/book`, {
        bookingDate: bookingDate.toISOString().split('T')[0],
      });
      setSuccess(res.data.message);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading room details...</div>;
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
          <p className="text-xl font-semibold text-green-600 mb-4">
            ${room.price}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
            disabled={!room.isAvailable}
          >
            {room.isAvailable ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {room.reviews?.length > 0 ? (
          <div className="space-y-4">
            {room.reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 shadow rounded">
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-gray-600 italic">"{review.comment}"</p>
                <p className="text-yellow-500">Rating: {review.rating}⭐</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet for this room.</p>
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[500px] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>
            <p className="mb-2 text-gray-700">{room.title}</p>
            <p className="mb-2">
              Price:{' '}
              <span className="font-semibold text-green-600">
                ${room.price}
              </span>
            </p>
            <p className="mb-2 text-gray-600">{room.description}</p>
            <div className="my-4">
              <label className="block text-gray-700 font-medium mb-1">
                Select Booking Date
              </label>
              <DatePicker
                selected={bookingDate}
                onChange={date => setBookingDate(date)}
                className="input input-bordered w-full"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <button onClick={handleBooking} className="btn btn-success w-full">
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailsPage;
