import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const fetchJWT = async email => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        return true;
      }
      throw new Error('Token missing in response');
    } catch (error) {
      console.error('JWT fetch error:', error.message);
      Swal.fire('Error', 'Failed to fetch JWT token.', 'error');
      return false;
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    const email = e.target.email.value.trim();
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-luxury text-luxury transition-colors duration-300 mt-10">
      <div className="bg-[var(--color-bg)] shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-heading text-center mb-6">
          Login Now
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-subtitle font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
              className="input input-bordered w-full bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-subtitle font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              className="input input-bordered w-full bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-luxury w-full mt-4 font-semibold py-3 rounded-md shadow-lg transition-colors"
          >
            Login
          </button>
        </form>

        <div className="divider text-subtitle">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full text-[var(--color-highlight)] border-[var(--color-highlight)] hover:bg-[var(--color-highlight)] hover:text-[var(--color-bg)] transition-colors font-semibold"
        >
          <i className="fa-brands fa-google mr-2"></i> Continue with Google
        </button>

        <p className="text-center mt-6 text-subtitle">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-[var(--color-accent)] font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
