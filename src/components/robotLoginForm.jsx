import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import webSocketManager from '../utils/webSocketManager';

const RobotLoginForm = () => {
  const [robotId, setRobotId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/robot/login', { robotId, password });
      const data = res.data;
      console.log('Login response data:', data);
      if (res.status === 200) {
        localStorage.setItem('restaurantId', data.restaurantId); // Store restaurantId in localStorage

        // Setup WebSocket connection after successful login
        webSocketManager.connect('ws://localhost:3000', data.robotId, (message) => {
          console.log('WebSocket message:', message);
          if (message.type === 'auth') {
            localStorage.setItem('robotAuthToken', message.idToken);
          }
        });

        navigate('/restaurant-menu');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('An error occurred');
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Robot Login</h2>
        <input
          type="text"
          placeholder="Robot ID"
          value={robotId}
          onChange={(e) => setRobotId(e.target.value)}
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
      </form>
    </div>
  );
};

export default RobotLoginForm;
