import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RobotLoginForm = () => {
  const [robotId, setRobotId] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/robot/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ robotId }),
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
        <button type="submit">Login</button>

        <div className="form-footer">
          Don't have an account?{' '}
          <Link to="/robot-signup" className="form-link">
            Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RobotLoginForm;
