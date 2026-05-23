/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. User login pannalana Login page-ku poga sollu
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Admin page access panna try panni, usertype admin illana Home-ku poga sollu
  if (requireAdmin && user.usertype !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;