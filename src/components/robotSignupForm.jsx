import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const res = await fetch('http://localhost:3000/api/robot/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ robotName, restaurantId }),
      });
  
      const data = await res.json();
  
      if (res.status === 409) {
        // Alert for duplicate robot name in the same restaurant
        alert('A robot with this name already exists for this restaurant. Please choose a different name.');
      } else if (res.ok) {
        alert(`Robot registered successfully!`);
        setRobotName('');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        alert(data.message || 'Failed to register robot.');
      }
    } catch (err) {
      alert('Error occurred during signup.');
      console.error(err);
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
