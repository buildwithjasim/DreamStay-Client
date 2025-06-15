import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const SpecialOfferModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <input
        type="checkbox"
        id="offer-modal"
        className="modal-toggle"
        checked={show}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-br from-yellow-100 via-white to-yellow-50 p-0">
          <label
            htmlFor="offer-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
            onClick={() => setShow(false)}
          >
            ✕
          </label>

          <img
            src="https://i.ibb.co/q3YcQ4pM/banner1.jpg"
            alt="Special Offer"
            className="w-full h-48 object-cover rounded-t-xl"
          />

          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-yellow-700">
              🔥 Limited Time Offer!
            </h3>
            <p className="py-2 text-gray-700">
              Get <span className="text-yellow-900 font-semibold">20% OFF</span>{' '}
              on all rooms for bookings made this week. Don't miss this chance
              to stay in style at a great price!
            </p>
            <Link to="/rooms" className="btn btn-warning mt-4">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferModal;
