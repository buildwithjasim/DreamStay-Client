import React from 'react';
import Banner from '../components/Banner';
import LocationMap from '../components/LocationMap';
import WhyChoseUs from '../components/WhyChoseUs';
import Amenities from '../components/Amenities';
import SpecialOfferModal from '../components/SpecialOfferModal';
import FeaturedRooms from '../components/FeaturedRooms';
import UserReviews from '../components/UserReviews';
import PrivateRoute from '../routes/PrivateRoute';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LocationMap></LocationMap>
      <SpecialOfferModal></SpecialOfferModal>
      <FeaturedRooms></FeaturedRooms>
      <Amenities></Amenities>
      <WhyChoseUs></WhyChoseUs>
      <UserReviews></UserReviews>
    </div>
  );
};

export default Home;
