import React, { useState } from 'react';
import api from '../api/api';

const RobotList = ({ robots, onAdd, restaurantId }) => {
  const [selectedRobot, setSelectedRobot] = useState(null);

  const handleRobotClick = async (robotName) => {
    try {
      // Use query parameters to match your backend
      const res = await api.get(`/api/robot/credentials`, {
        params: { robotName, restaurantId }
      });

      setSelectedRobot({ name: robotName, ...res.data });
    } catch (err) {
      console.error('Failed to fetch robot credentials:', err);
      alert('Could not retrieve robot credentials');
    }
  };

  const closePopup = () => setSelectedRobot(null);

  return (
    <div className="dashboard-section">
      <h2>Robots</h2>
      <ul className="list">
        {robots.map((robot, index) => (
          <li key={index} onClick={() => handleRobotClick(robot.name)} style={{ cursor: 'pointer' }}>
            {robot.name}
          </li>
        ))}
      </ul>
      <button className="add-btn" onClick={onAdd}>+ Add Robot</button>

      {selectedRobot && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedRobot.name}</h3>
            <p><strong>ID:</strong> {selectedRobot.robotId}</p>
            <p><strong>Password:</strong> {selectedRobot.robotPassword}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RobotList;
