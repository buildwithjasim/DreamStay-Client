import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer
      className="bg-luxury py-14 mt-16 select-none"
      style={{ color: 'var(--color-accent)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
        {/* Navigation Links */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-col md:flex-row gap-8 md:gap-12 text-lg font-semibold tracking-wide uppercase"
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/rooms', label: 'Rooms' },
            { to: '/mybooking', label: 'My Booking' },

            { to: '/about', label: 'About Us' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className="hover:text-[var(--color-secondary)] transition-colors duration-300"
              style={{ color: 'var(--color-accent)' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div
          className="flex gap-8 text-3xl"
          aria-label="Social media links"
          role="list"
          style={{ color: 'var(--color-accent)' }}
        >
          {/* Twitter */}
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-[var(--color-secondary)] transition-colors duration-300"
            role="listitem"
            style={{ color: 'var(--color-accent)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7"
              aria-hidden="true"
            >
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775a4.932 4.932 0 002.163-2.724 9.865 9.865 0 01-3.127 1.195 4.918 4.918 0 00-8.38 4.482 13.945 13.945 0 01-10.124-5.144 4.822 4.822 0 001.523 6.574 4.904 4.904 0 01-2.229-.616v.06a4.917 4.917 0 003.946 4.813 4.996 4.996 0 01-2.224.084 4.923 4.923 0 004.6 3.419 9.867 9.867 0 01-7.29 2.04c2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646a9.936 9.936 0 002.457-2.549z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-[var(--color-secondary)] transition-colors duration-300"
            role="listitem"
            style={{ color: 'var(--color-accent)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7"
              aria-hidden="true"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-[var(--color-secondary)] transition-colors duration-300"
            role="listitem"
            style={{ color: 'var(--color-accent)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7"
              aria-hidden="true"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="mt-12 text-center text-sm"
        style={{ color: 'var(--color-accent)' }}
      >
        &copy; {new Date().getFullYear()} DreamStay. All rights reserved.
      </div>
    </footer>
  );
}
