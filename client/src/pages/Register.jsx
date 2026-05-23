import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    usertype: 'Customer' // Schema field 'usertype' mathiriye vachirukkom
});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <div style={{ width: '400px', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#1e3a8a', marginBottom: '1.5rem' }}>Register</h2>
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="username" placeholder="Username" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input name="email" type="email" placeholder="Email address" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          
          {/* New User Type Dropdown */}
          <select name="usertype" onChange={handleChange} value={formData.usertype} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #1e3a8a', outline: 'none' }}>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#4F46E5', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Register
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
          Already registered? <Link to="/login" style={{ color: '#4F46E5', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;