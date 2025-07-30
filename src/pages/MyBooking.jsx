import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import Rating from 'react-rating-stars-component';

const MyBookings = () => {
  const { user, token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showReviewId, setShowReviewId] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookings?email=${user?.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchBookings();
  }, [user, token]);

  const handleCancel = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel this booking.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(prev => prev.filter(b => b._id !== id));
        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
      } catch (err) {
        Swal.fire('Error', 'Failed to cancel booking.', 'error');
      }
    }
  };

  const handleUpdateDate = async id => {
    if (!selectedDate) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/bookings/${id}`,
        { bookingDate: selectedDate.toISOString().split('T')[0] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire('Updated!', 'Booking date updated successfully.', 'success');
      setUpdatingId(null);
      setSelectedDate(null);

      setBookings(prev =>
        prev.map(b =>
          b._id === id
            ? { ...b, bookingDate: selectedDate.toISOString().split('T')[0] }
            : b
        )
      );
    } catch (err) {
      Swal.fire('Error', 'Failed to update date.', 'error');
    }
  };

  const handleSubmitReview = async booking => {
    if (!rating || !reviewText.trim()) {
      return Swal.fire(
        'Error',
        'Please fill in rating and comment.',
        'warning'
      );
    }

    const reviewData = {
      roomId: booking.roomId,
      reviewer: user.displayName,
      reviewerImage: user?.photoURL,
      email: user?.email,
      rating,
      comment: reviewText,
      createdAt: new Date().toISOString(),
    };

    console.log(reviewData);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire('Success!', 'Review submitted successfully.', 'success');
      setShowReviewId(null);
      setReviewText('');
      setRating(0);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to submit review.', 'error');
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading your bookings...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>Image</th>
              <th>Room</th>
              <th>Price</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>
                  <img
                    src={booking.image}
                    alt={booking.title}
                    className="w-20 h-16 rounded object-cover"
                  />
                </td>
                <td>{booking.title}</td>
                <td>${booking.price}</td>
                <td>{booking.bookingDate}</td>
                <td className="space-y-2">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowReviewId(booking._id)}
                      className="btn btn-sm btn-info"
                    >
                      Give Review
                    </button>
                    <button
                      onClick={() => {
                        setUpdatingId(booking._id);
                        setSelectedDate(null);
                      }}
                      className="btn btn-sm btn-warning"
                    >
                      Update Date
                    </button>
                  </div>

                  {updatingId === booking._id && (
                    <div className="mt-2 flex flex-col gap-2">
                      <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className="input input-bordered"
                        placeholderText="Select new date"
                      />
                      <button
                        onClick={() => handleUpdateDate(booking._id)}
                        className="btn btn-success btn-sm"
                      >
                        Save
                      </button>
                    </div>
                  )}

                  {showReviewId === booking._id && (
                    <div className="bg-base-200 p-3 rounded mt-2 space-y-2">
                      <p className="font-semibold">
                        Reviewer: {user.displayName}
                      </p>
                      <Rating
                        count={5}
                        size={24}
                        value={rating}
                        onChange={setRating}
                        activeColor="#ffd700"
                      />
                      <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                      ></textarea>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSubmitReview(booking)}
                          className="btn btn-sm btn-success"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => setShowReviewId(null)}
                          className="btn btn-sm btn-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
