import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // 🔐 Fetch JWT token and store it
  const fetchJWT = async email => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        return true;
      } else {
        throw new Error('Token missing in response');
      }
    } catch (error) {
      console.error('JWT fetch error:', error.message);
      Swal.fire('Error', 'JWT token fetch failed', 'error');
      return false;
    }
  };

  // 🔑 Email/Password login
  const handleLogin = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await loginUser(email, password);
      const tokenSuccess = await fetchJWT(result.user.email);

      if (tokenSuccess) {
        Swal.fire('Success!', 'You are successfully logged in.', 'success');
        navigate(from, { replace: true });
      }
    } catch (error) {
      Swal.fire(
        'Login Failed',
        error.message || 'Invalid credentials.',
        'error'
      );
    }
  };

  // 🔘 Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const tokenSuccess = await fetchJWT(result.user.email);

      if (tokenSuccess) {
        Swal.fire('Success!', 'Logged in with Google.', 'success');
        navigate(from, { replace: true });
      }
    } catch (error) {
      Swal.fire(
        'Google Sign-in Failed',
        error.message || 'Something went wrong!',
        'error'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login Now</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full text-blue-600"
        >
          <i className="fa-brands fa-google mr-2"></i> Continue with Google
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-pink-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
