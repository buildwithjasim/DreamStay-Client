import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    const { name, email, password, photoURL } = data;

    // ✅ Password validation
    if (password.length < 6) {
      return Swal.fire(
        'Error',
        'Password must be at least 6 characters.',
        'error'
      );
    }
    if (!/[A-Z]/.test(password)) {
      return Swal.fire(
        'Error',
        'Password must contain at least one uppercase letter.',
        'error'
      );
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire(
        'Error',
        'Password must contain at least one lowercase letter.',
        'error'
      );
    }

    setLoading(true);
    try {
      // ✅ Create Firebase user
      const result = await createUser(email, password);

      // ✅ Update Firebase profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL,
      });

      // ✅ Save user in database
      const user = { name, email, photo: photoURL };
      const saveUserRes = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!saveUserRes.ok) throw new Error('Failed to save user in DB');

      // ✅ Get JWT token
      const tokenRes = await fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const tokenData = await tokenRes.json();
      localStorage.setItem('token', tokenData.token);

      Swal.fire('Success', 'Registration successful!', 'success');
      navigate('/');
    } catch (error) {
      console.error(error.message);
      Swal.fire('Error', error.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-luxury mt-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-heading text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-semibold text-subtitle"
            >
              Name
            </label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-subtitle"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="block mb-1 font-semibold text-subtitle"
            >
              Photo URL
            </label>
            <input
              id="photoURL"
              type="url"
              {...register('photoURL', { required: 'Photo URL is required' })}
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
            {errors.photoURL && (
              <p className="text-red-600 mt-1">{errors.photoURL.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-subtitle"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="Your password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-luxury w-full py-3 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-6 text-secondary">
          Already have an account?{' '}
          <a href="/login" className="text-accent font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
