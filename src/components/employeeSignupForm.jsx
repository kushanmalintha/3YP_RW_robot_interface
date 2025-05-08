import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const EmployeeSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    restaurantId: '',
  });

  const [restaurants, setRestaurants] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get('api/employee/restaurants');
        setRestaurants(res.data.restaurants);
      } catch (err) {
        console.error('Failed to load restaurants:', err);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await api.post('api/employee/signup', formData);
      setStatus({ loading: false, error: '', success: res.data.message });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

      setFormData({ name: '', email: '', password: '', restaurantId: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Signup failed', success: '' });
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Employee Signup</h2>
      <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      
      <select name="restaurantId" value={formData.restaurantId} onChange={handleChange} required>
        <option value="">Select a restaurant</option>
        {restaurants.map((r) => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Signing up...' : 'Signup'}
      </button>

      {status.error && <p className="error">{status.error}</p>}
      {status.success && <p className="success">{status.success}</p>}
    </form>
  );
};

export default EmployeeSignupForm;
