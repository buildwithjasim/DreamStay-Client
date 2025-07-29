import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // ✅ FIXED: should be 'react-router-dom'
import AuthContext from '../context/AuthContext'; // ✅ FIXED: import from AuthContext, not AuthProvider

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
