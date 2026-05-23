import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // MUST IMPORT THIS

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import AddProduct from './pages/admin/AddProduct';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <Router>
      <Navbar /> 
      
      {/* Toast Container for global notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

        <Route path="/admin/add-product" element={<ProtectedRoute requireAdmin={true}><AddProduct /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute requireAdmin={true}><AdminOrders /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;