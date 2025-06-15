import React from 'react';
import Banner from '../components/Banner';
import LocationMap from '../components/LocationMap';
import WhyChoseUs from '../components/WhyChoseUs';
import Amenities from '../components/Amenities';
import SpecialOfferModal from '../components/SpecialOfferModal';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LocationMap></LocationMap>
      <SpecialOfferModal></SpecialOfferModal>
      <WhyChoseUs></WhyChoseUs>
      <Amenities></Amenities>
    </div>
  );
};

export default Home;
