import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const EmployeeSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) {
      setStatus({ loading: false, error: 'No restaurant ID found in localStorage.', success: '' });
      return;
    }

    try {
      const res = await api.post('api/employee/signup', { ...formData, restaurantId });
      setStatus({ loading: false, error: '', success: res.data.message });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Signup failed', success: '' });
    }
  };

  return (
    <div className="signup-page">
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Employee Signup</h2>
      <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      
      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Signing up...' : 'Signup'}
      </button>

      {status.error && <p className="error">{status.error}</p>}
      {status.success && <p className="success">{status.success}</p>}
    </form>
    </div>
  );
};

export default EmployeeSignupForm;
