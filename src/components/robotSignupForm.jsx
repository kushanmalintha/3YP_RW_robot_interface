import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RobotSignupForm = () => {
  const [robotId, setRobotId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState({ error: '', success: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get('api/employee/restaurants');
        setRestaurants(res.data.restaurants);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    };
    fetchRestaurants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!robotId || !restaurantId) {
      setMessage({ error: 'Please provide both Robot ID and Restaurant', success: '' });
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/robot/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ robotId, restaurantId }), // Send the restaurant doc ID
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ success: 'Robot registered successfully!', error: '' });
        setRobotId('');
        setRestaurantId('');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setMessage({ error: data.message, success: '' });
      }
    } catch (err) {
      setMessage({ error: 'Error occurred during signup.', success: '' });
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Robot Signup</h2>

        <input
          type="text"
          placeholder="Robot ID"
          value={robotId}
          onChange={(e) => setRobotId(e.target.value)}
          required
        />

        <select
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          required
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <button type="submit">Robot Signup</button>

        {message.error && <p className="error">{message.error}</p>}
        {message.success && <p className="success">{message.success}</p>}
      </form>
    </div>
  );
};

export default RobotSignupForm;
