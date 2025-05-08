import React from 'react';

const RobotList = ({ robots, onAdd }) => {
  return (
    <div className="dashboard-section">
      <h2>Robots</h2>
      <ul className="list">
        {robots.map((robot, index) => (
          <li key={index}>{robot.robotId}</li>
        ))}
      </ul>
      <button className="add-btn" onClick={onAdd}>+ Add Robot</button>
    </div>
  );
};

export default RobotList;
