/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const user = JSON.parse(localStorage.getItem('user'));


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.usertype !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;