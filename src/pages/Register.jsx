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
    const { name, email, password, photo } = data;

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
        photoURL: photo,
      });

      // ✅ Save user in database
      const user = { name, email, photo };
      const saveUserRes = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!saveUserRes.ok) throw new Error('Failed to save user in DB');

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: true })}
            placeholder="Name"
            className="input input-bordered w-full"
          />
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <input
            {...register('photoURL', { required: true })}
            type="url"
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />

          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
