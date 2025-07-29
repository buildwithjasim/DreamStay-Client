import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // ✅ FIXED IMPORT
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

function Login() {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'You are successfully logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate(from, { replace: true }); // ✅ Redirect to previous page or home
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message || 'Invalid email or password.',
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'You are successfully logged in with Google.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate(from, { replace: true });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-in Failed',
          text: error.message || 'Something went wrong!',
        });
      });
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
              placeholder="Enter email"
              name="email"
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
              placeholder="Enter password"
              name="password"
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
}

export default Login;
