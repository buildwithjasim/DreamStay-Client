import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Rooms from '../pages/Rooms';
import RoomDetails from '../pages/RoomDetails';
import MyBookings from '../pages/MyBooking';
import PrivateRoute from './PrivateRoute';
import About from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/rooms',
        element: <Rooms />,
      },
      {
        path: '/rooms/:id',
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/mybooking',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },

      {
        path: '/aboutUs',
        element: <About />,
      },
      {
        path: '/contactUs',
        element: <ContactUs />,
      },

      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

export default router;
