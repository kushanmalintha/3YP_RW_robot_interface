import React, { useEffect, useState } from 'react';
import EmployeeList from './employeeList';
import RobotList from './robotList';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RestaurantDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [robots, setRobots] = useState([]);
  const navigate = useNavigate();

  const restaurantId = localStorage.getItem('restaurantId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/restaurant/${restaurantId}/entities`);
        setEmployees(res.data.employees);
        setRobots(res.data.robots);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchData();
  }, [restaurantId]);

  const handleAddEmployee = () => navigate('/employee-signup');
  const handleAddRobot = () => navigate('/robot-signup');
  const handleAddMenuItem = () => navigate('/add-menu-item');

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Restaurant Dashboard</h1>
        <button className="add-menu-btn" onClick={handleAddMenuItem}>+ Add Menu Item</button>
      </div>
      <div className="dashboard-grid">
        <EmployeeList employees={employees} onAdd={handleAddEmployee} />
        <RobotList robots={robots} onAdd={handleAddRobot} />
      </div>
    </div>
  );
};

export default RestaurantDashboard;
