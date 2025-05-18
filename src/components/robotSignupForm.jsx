import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RobotSignupForm = () => {
  const [robotName, setRobotName] = useState('');
  const [message, setMessage] = useState({ error: '', success: '' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const restaurantId = localStorage.getItem('restaurantId');
  
    if (!robotName || !restaurantId) {
      alert('Robot name and restaurant ID are required.');
      return;
    }
  
    try {
      const res = await api.post('/api/robot/signup', { robotName, restaurantId });
      if (res.status === 409) {
        alert('A robot with this name already exists for this restaurant. Please choose a different name.');
      } else if (res.status === 200 || res.status === 201 || res.data) {
        alert(`Robot registered successfully!`);
        setRobotName('');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        alert(res.data?.message || 'Failed to register robot.');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('A robot with this name already exists for this restaurant. Please choose a different name.');
      } else {
        alert('Error occurred during signup.');
        console.error(err);
      }
    }
  };  

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Register Robot</h2>

        <input
          type="text"
          placeholder="Robot Name"
          value={robotName}
          onChange={(e) => setRobotName(e.target.value)}
          required
        />

        <button type="submit">Register Robot</button>

        {message.error && <p className="error">{message.error}</p>}
        {message.success && <p className="success">{message.success}</p>}
      </form>
    </div>
  );
};

export default RobotSignupForm;
