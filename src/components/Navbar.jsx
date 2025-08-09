import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function Navbar() {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be signed out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sign out!',
    }).then(result => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire('Signed Out!', 'You have been signed out.', 'success');
          })
          .catch(error => {
            Swal.fire('Oops!', error.message, 'error');
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn btn-ghost rounded-md ${
              isActive ? 'bg-primary text-white' : ''
            }`
          }
          onClick={() => setDropdownOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            `btn btn-ghost rounded-md ${
              isActive ? 'bg-primary text-white' : ''
            }`
          }
          onClick={() => setDropdownOpen(false)}
        >
          Rooms
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/mybooking"
            className={({ isActive }) =>
              `btn btn-ghost rounded-md ${
                isActive ? 'bg-primary text-white' : ''
              }`
            }
            onClick={() => setDropdownOpen(false)}
          >
            My Booking
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Navbar Start */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle menu"
              aria-expanded={dropdownOpen}
              className="btn btn-ghost lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    dropdownOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-extrabold tracking-wide text-primary select-none"
            >
              DreamStay
            </Link>
          </div>

          {/* Navbar Center - Desktop Menu */}
          <ul className="hidden lg:flex lg:space-x-2">{navLinks}</ul>

          {/* Navbar End - User Info / Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={`${user.displayName || 'User'} avatar`}
                      className="w-8 h-8 rounded-full object-cover"
                      title={user.displayName}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 select-none"
                      title={user.displayName}
                    >
                      {user.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span
                    className="hidden sm:inline text-sm font-medium truncate max-w-[120px]"
                    title={user.displayName}
                  >
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="btn btn-sm btn-primary"
                  aria-label="Sign out"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn btn-ghost btn-sm rounded-md ${
                    isActive ? 'bg-primary text-white' : ''
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {dropdownOpen && (
        <div className="lg:hidden bg-base-100 shadow-md border-t border-gray-200">
          <ul className="menu menu-compact p-2">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
}
