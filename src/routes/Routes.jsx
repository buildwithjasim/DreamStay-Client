import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
// import PrivateRoute from '../routes/PrivateRoute';

import Register from '../pages/Register';
import Rooms from '../pages/Rooms';

// import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      { path: '/rooms', element: <Rooms /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);
export default router;
