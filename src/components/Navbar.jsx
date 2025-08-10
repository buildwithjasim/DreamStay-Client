import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router';
import AuthContext from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import Swal from 'sweetalert2';

export default function Navbar() {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be signed out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-accent)', // use CSS var here
      cancelButtonColor: '#7f6a1a',
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

  // Links array
  const links = [
    { path: '/', label: 'Home' },
    { path: '/rooms', label: 'Rooms' },
    { path: '/aboutUs', label: 'About Us' },
    { path: '/contactUs', label: 'Contact' },
  ];

  return (
    <nav
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
      aria-label="Primary Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle menu"
              aria-expanded={dropdownOpen}
              className="btn btn-ghost lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 transition-colors duration-300"
              style={{
                color: 'var(--color-accent)',
                outlineColor: 'var(--color-accent)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--color-accent)' }}
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
              className="text-2xl font-extrabold tracking-wide select-none transition-colors duration-300"
              style={{ color: 'var(--color-accent)' }}
            >
              DreamStay
            </Link>
          </div>

          {/* Center Menu */}
          <ul className="hidden lg:flex lg:space-x-4">
            {links.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    'rounded-md px-3 py-2 transition-colors duration-200 font-semibold'
                  }
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--color-bg)' : 'var(--color-accent)',
                    backgroundColor: isActive
                      ? 'var(--color-accent)'
                      : 'transparent',
                  })}
                  onClick={() => setDropdownOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {user && (
              <li>
                <NavLink
                  to="/mybooking"
                  className="rounded-md px-3 py-2 transition-colors duration-200 font-semibold"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--color-bg)' : 'var(--color-accent)',
                    backgroundColor: isActive
                      ? 'var(--color-accent)'
                      : 'transparent',
                  })}
                  onClick={() => setDropdownOpen(false)}
                >
                  My Booking
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right side */}
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
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold select-none"
                      title={user.displayName}
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {user.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span
                    className="hidden sm:inline truncate max-w-[120px] font-medium"
                    title={user.displayName}
                    style={{ color: 'var(--color-text)' }}
                  >
                    {user.displayName}
                  </span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="btn-luxury btn-sm transition"
                  style={{ minWidth: '80px' }}
                  aria-label="Sign out"
                >
                  Logout
                </button>

                {/* Theme toggle */}
                <label
                  className="swap swap-rotate cursor-pointer ml-2"
                  aria-label="Toggle theme"
                >
                  <input
                    type="checkbox"
                    checked={theme === 'luxury-dark'}
                    onChange={toggleTheme}
                  />
                  {/* Sun icon */}
                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71a1,1,0,1,0-1.41-1.41ZM12,5a7,7,0,1,0,7,7A7,7,0,0,0,12,5Zm0,12a5,5,0,1,1,5-5A5,5,0,0,1,12,17Zm8-5h1a1,1,0,0,0,0-2H20a1,1,0,0,0,0,2ZM12,2a1,1,0,0,0,1-1V0a1,1,0,0,0-2,0V1A1,1,0,0,0,12,2ZM4.22,4.22a1,1,0,0,0,1.41,0L6.34,3.51a1,1,0,0,0-1.41-1.41L4.22,2.81A1,1,0,0,0,4.22,4.22ZM1,13H2a1,1,0,0,0,0-2H1a1,1,0,0,0,0,2ZM17.66,6.34a1,1,0,0,0,1.41,0l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71A1,1,0,0,0,17.66,6.34Zm.71,10.31-.71-.71a1,1,0,1,0-1.41,1.41l.71.71a1,1,0,0,0,1.41-1.41Z" />
                  </svg>

                  {/* Moon icon */}
                  <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.07,5.49a8.59,8.59,0,0,1,.25-2,1,1,0,0,0-1.27-1.16A10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
                  </svg>
                </label>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn-luxury btn-sm transition rounded-md"
                  style={{ minWidth: '80px' }}
                >
                  Login
                </NavLink>

                {/* Theme toggle */}
                <label
                  className="swap swap-rotate cursor-pointer ml-2"
                  aria-label="Toggle theme"
                >
                  <input
                    type="checkbox"
                    checked={theme === 'luxury-dark'}
                    onChange={toggleTheme}
                  />
                  {/* Sun icon */}
                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71a1,1,0,1,0-1.41-1.41ZM12,5a7,7,0,1,0,7,7A7,7,0,0,0,12,5Zm0,12a5,5,0,1,1,5-5A5,5,0,0,1,12,17Zm8-5h1a1,1,0,0,0,0-2H20a1,1,0,0,0,0,2ZM12,2a1,1,0,0,0,1-1V0a1,1,0,0,0-2,0V1A1,1,0,0,0,12,2ZM4.22,4.22a1,1,0,0,0,1.41,0L6.34,3.51a1,1,0,0,0-1.41-1.41L4.22,2.81A1,1,0,0,0,4.22,4.22ZM1,13H2a1,1,0,0,0,0-2H1a1,1,0,0,0,0,2ZM17.66,6.34a1,1,0,0,0,1.41,0l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71A1,1,0,0,0,17.66,6.34Zm.71,10.31-.71-.71a1,1,0,1,0-1.41,1.41l.71.71a1,1,0,0,0,1.41-1.41Z" />
                  </svg>

                  {/* Moon icon */}
                  <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.07,5.49a8.59,8.59,0,0,1,.25-2,1,1,0,0,0-1.27-1.16A10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
                  </svg>
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {dropdownOpen && (
        <div
          className="lg:hidden shadow-md border-t transition-colors duration-300"
          style={{
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
          }}
        >
          <ul className="menu menu-compact p-4">
            {links.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className="rounded-md px-3 py-2 font-semibold"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--color-bg)' : 'var(--color-accent)',
                    backgroundColor: isActive
                      ? 'var(--color-accent)'
                      : 'transparent',
                  })}
                  onClick={() => setDropdownOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {user && (
              <li>
                <NavLink
                  to="/mybooking"
                  className="rounded-md px-3 py-2 font-semibold"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--color-bg)' : 'var(--color-accent)',
                    backgroundColor: isActive
                      ? 'var(--color-accent)'
                      : 'transparent',
                  })}
                  onClick={() => setDropdownOpen(false)}
                >
                  My Booking
                </NavLink>
              </li>
            )}
            <li>
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setDropdownOpen(false);
                  }}
                  className="btn-luxury w-full mt-2"
                  aria-label="Sign out"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="btn-luxury w-full mt-2 text-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </li>
            <li className="mt-4 flex justify-center">
              {/* Theme toggle for mobile */}
              <label
                className="swap swap-rotate cursor-pointer"
                aria-label="Toggle theme"
              >
                <input
                  type="checkbox"
                  checked={theme === 'luxury-dark'}
                  onChange={toggleTheme}
                />
                {/* Sun icon */}
                <svg
                  className="swap-on fill-current w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71a1,1,0,1,0-1.41-1.41ZM12,5a7,7,0,1,0,7,7A7,7,0,0,0,12,5Zm0,12a5,5,0,1,1,5-5A5,5,0,0,1,12,17Zm8-5h1a1,1,0,0,0,0-2H20a1,1,0,0,0,0,2ZM12,2a1,1,0,0,0,1-1V0a1,1,0,0,0-2,0V1A1,1,0,0,0,12,2ZM4.22,4.22a1,1,0,0,0,1.41,0L6.34,3.51a1,1,0,0,0-1.41-1.41L4.22,2.81A1,1,0,0,0,4.22,4.22ZM1,13H2a1,1,0,0,0,0-2H1a1,1,0,0,0,0,2ZM17.66,6.34a1,1,0,0,0,1.41,0l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71A1,1,0,0,0,17.66,6.34Zm.71,10.31-.71-.71a1,1,0,1,0-1.41,1.41l.71.71a1,1,0,0,0,1.41-1.41Z" />
                </svg>

                {/* Moon icon */}
                <svg
                  className="swap-off fill-current w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.07,5.49a8.59,8.59,0,0,1,.25-2,1,1,0,0,0-1.27-1.16A10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
                </svg>
              </label>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
