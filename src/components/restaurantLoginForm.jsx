import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RestaurantLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/api/restaurant/login', { email, password });
      const data = response.data;
      // console.log('aaaaaaaaaaaaa', data.token);
      if (response.status === 200) {
        localStorage.setItem('restaurantId', data.uid); // Store uid as restaurantId
        localStorage.setItem('restaurantToken', data.token); // Store token
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred during login');
      }
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Restaurant Login</h2>
      <input
        type="email"
        placeholder="Restaurant Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
      <p className="form-footer">
        Don’t have an account?{' '}
        <span className="form-link" onClick={() => navigate('/restaurant-signup')}>
          Sign up here
        </span>
      </p>
    </form>
    </div>
  );
};

export default RestaurantLoginForm;
