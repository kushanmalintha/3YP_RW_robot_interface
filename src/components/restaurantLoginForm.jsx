import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/restaurant/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('restaurantId', data.restaurantId);
        navigate('/dashboard'); // Adjust as needed
        // console.log('Login successful:', data);
        // const savedId = localStorage.getItem('restaurantId');
        // console.log('Saved restaurantId in localStorage:', savedId);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  };

  return (
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
      <button type="submit">Login</button>
      <p className="form-footer">
        Don’t have an account?{' '}
        <span className="form-link" onClick={() => navigate('/restaurant-signup')}>
          Sign up here
        </span>
      </p>
    </form>
  );
};

export default RestaurantLoginForm;
