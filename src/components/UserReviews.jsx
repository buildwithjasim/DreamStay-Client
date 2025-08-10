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

  if (reviews.length === 0) {
    return (
      <section
        className="py-16 px-6 max-w-6xl mx-auto text-center rounded-lg shadow-inner"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <h2
          className="text-4xl font-extrabold mb-8"
          style={{ color: 'var(--color-accent)' }}
        >
          💬 What Guests Are Saying
        </h2>
        <p className="text-xl" style={{ color: 'var(--color-secondary)' }}>
          No reviews yet.
        </p>
      </section>
    );
  }

  return (
    <section
      className="py-12"
      aria-label="Guest reviews"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <h2
        className="text-4xl font-extrabold text-center mb-12"
        style={{ color: 'var(--color-accent)' }}
      >
        💬 What Guests Are Saying
      </h2>

      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-6"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <article
              className="rounded-2xl shadow-md p-7 flex flex-col justify-between h-full transition-transform hover:-translate-y-2 hover:shadow-2xl"
              tabIndex={0}
              aria-label={`Review by ${review.userName || 'Anonymous'}`}
              style={{ backgroundColor: 'var(--color-bg)' }}
            >
              <div className="mb-6">
                <p
                  className="italic text-lg leading-relaxed tracking-wide"
                  style={{ color: 'var(--color-text)' }}
                >
                  &ldquo;{review.text || 'No comment provided'}&rdquo;
                </p>
                <div
                  className="flex items-center gap-1 mt-4"
                  style={{ color: 'var(--color-accent)' }}
                  aria-label={`Rating: ${review.rating || 0} out of 5 stars`}
                >
                  {[...Array(Math.min(Math.round(review.rating || 0), 5))].map(
                    (_, i) => (
                      <FaStar
                        key={i}
                        className="drop-shadow"
                        aria-hidden="true"
                      />
                    )
                  )}
                </div>
              </div>

              <footer className="flex items-center gap-4">
                <img
                  src={review.userImage || 'https://i.ibb.co/zP4rH9d/user.png'}
                  alt={review.userName || 'Guest'}
                  className="w-12 h-12 rounded-full object-cover"
                  style={{ border: '2px solid var(--color-accent)' }}
                  loading="lazy"
                />
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {review.userName || 'Anonymous'}
                  </p>
                  <small style={{ color: 'var(--color-secondary)' }}>
                    {review.roomTitle || 'Unknown Room'}
                  </small>
                </div>
              </footer>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UserReviews;
