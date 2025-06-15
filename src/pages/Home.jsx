import React from 'react';
import Banner from '../components/Banner';
import LocationMap from '../components/LocationMap';
import WhyChoseUs from '../components/WhyChoseUs';
import Amenities from '../components/Amenities';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LocationMap></LocationMap>
      <WhyChoseUs></WhyChoseUs>
      <Amenities></Amenities>
    </div>
  );
};

export default Home;
