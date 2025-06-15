import React from 'react';
import { Link } from 'react-router';

export default function Banner() {
  return (
    <div className="carousel w-full h-[70vh]">
      {/* Slide 1 */}
      <div
        id="slide1"
        className="carousel-item relative w-full h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co/TDfHfg2s/banner1.jpg')",
        }}
      >
        <div className="w-full h-full bg-opacity-60 flex items-center justify-center text-center text-white">
          <div className="max-w-xl px-4">
            <h2 className="md:text-5xl text-5xl font-bold text-[#FFD700] mb-4">
              Welcome to DreamStay
            </h2>
            <p className="text-lg md:text-xl text-[#EAEAEA] mb-6">
              Discover your perfect stay with top-rated rooms and luxury
              service.
            </p>
            <Link to="/rooms" className="btn btn-primary">
              Explore Rooms
            </Link>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div
        id="slide2"
        className="carousel-item relative w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co/xtrygVLx/banner2.jpg')",
        }}
      >
        <div className="w-full h-full bg-opacity-60 flex items-center justify-center text-center text-white">
          <div className="max-w-xl px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Modern Rooms & Comfort
            </h2>
            <p className="text-lg md:text-xl mb-6">
              Experience a luxury stay tailored to your comfort and style.
            </p>
            <Link to="/rooms" className="btn btn-primary">
              Explore Rooms
            </Link>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 */}
      <div
        id="slide3"
        className="carousel-item relative w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co/5Wxnr3Nv/banner4.jpg')",
        }}
      >
        <div className="w-full h-full bg-opacity-60 flex items-center justify-center text-center text-white">
          <div className="max-w-xl px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Book. Relax. Enjoy.
            </h2>
            <p className="text-lg md:text-xl mb-6">
              Easy online booking with amazing deals & special offers.
            </p>
            <Link to="/rooms" className="btn btn-primary">
              Explore Rooms
            </Link>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}
