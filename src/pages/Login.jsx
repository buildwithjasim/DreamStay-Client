import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';

function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log('Email:', email, 'Password:', password);

    // loginUser
    loginUser(email, password)
      .then(result => {
        console.log(result.data);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login Now</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="enter email"
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
              placeholder="enter password"
              name="password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button className="btn btn-primary w-full mt-4">Login</button>
        </form>

        <div className="divider">OR</div>

        <button className="btn btn-outline w-full text-blue-600">
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
