import React, { use } from 'react';
import { NavLink } from 'react-router';
import AuthContext from '../context/AuthContext';

export default function Navbar() {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <div className="navbar bg-base-800">
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
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/" className="btn btn-ghost">
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">DreamStay</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
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
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleSignOut} className="btn btn-ghost">
            Logout
          </button>
        ) : (
          <NavLink to="login" className="btn btn-ghost">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
