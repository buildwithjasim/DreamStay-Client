import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews`)
      .then(res => setReviews(res.data))

      .catch(err => console.error('Failed to fetch reviews:', err));
  }, []);

  return (
    <section className="py-12 bg-gray-50 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        💬 What Guests Are Saying
      </h2>

      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No reviews yet.
          </p>
        ) : (
          reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
                <div>
                  <p className="text-gray-700 italic mb-4">
                    "{review.text || 'No comment provided'}"
                  </p>
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    {[...Array(Math.min(review.rating || 0, 5))].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={
                      review.userImage || 'https://i.ibb.co/zP4rH9d/user.png'
                    }
                    alt={review.userName || 'Guest'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      {review.userName || 'Anonymous'}
                    </p>
                    <small className="text-gray-500">
                      {review.roomTitle || 'Unknown Room'}
                    </small>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
};

export default UserReviews;
