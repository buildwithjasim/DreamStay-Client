import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function Navbar() {
  const { user, signOutUser, loading } = useContext(AuthContext);

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
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="btn btn-ghost">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/rooms" className="btn btn-ghost">
          Rooms
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/mybooking" className="btn btn-ghost">
            My Booking
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          DreamStay
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  className="w-8 h-8 rounded-full"
                  alt="User Avatar"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                  {user.displayName?.charAt(0)}
                </div>
              )}
              <span className="text-sm">{user.displayName}</span>
            </div>
            <button onClick={handleSignOut} className="btn btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-ghost">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
