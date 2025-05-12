import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RobotLoginForm = () => {
  const [robotId, setRobotId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/robot/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ robotId, password }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/restaurant-menu');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('An error occurred');
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
