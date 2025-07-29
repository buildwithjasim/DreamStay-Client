import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    // ✅ Password validation
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    if (!uppercase.test(password)) {
      return setError('Password must contain at least one uppercase letter.');
    }
    if (!lowercase.test(password)) {
      return setError('Password must contain at least one lowercase letter.');
    }

    setError('');

    try {
      // ✅ Firebase user creation
      const result = await createUser(email, password);

      // ✅ Update Firebase profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      // ✅ Save user to database
      const saveUser = { name, email, photoURL };
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveUser),
      });

      if (res.ok) {
        // ✅ Get JWT token
        const tokenRes = await fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const tokenData = await tokenRes.json();
        localStorage.setItem('token', tokenData.token);

        Swal.fire({
          title: 'Success!',
          text: 'You are successfully registered.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        navigate('/');
      } else {
        throw new Error('Failed to save user in DB');
      }
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message || 'Something went wrong!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register Now</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
