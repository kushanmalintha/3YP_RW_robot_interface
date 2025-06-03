import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RestaurantSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await api.post('api/restaurant/signup', formData);
      setStatus({ loading: false, error: '', success: res.data.message || 'Signup successful' });

      setTimeout(() => {
        navigate('/restaurant-login');
      }, 1500);

      setFormData({ name: '', email: '', password: '', phone: '', address: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Signup failed', success: '' });
    }
  };

  return (
    <div className="signup-page">
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Restaurant Signup</h2>
      <input name="name" placeholder="Restaurant Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
      <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
      <input name="address" placeholder="Location" value={formData.address} onChange={handleChange} required />

      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Signing up...' : 'Signup'}
      </button>

      {status.error && <p className="error">{status.error}</p>}
      {status.success && <p className="success">{status.success}</p>}
    </form>
    </div>
  );
};

export default RestaurantSignupForm;
