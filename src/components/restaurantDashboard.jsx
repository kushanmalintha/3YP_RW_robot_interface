// No major changes, just pass restaurantId to RobotList
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
      const restaurantToken = localStorage.getItem('restaurantToken');
      if (!restaurantToken) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const res = await api.get(`/api/restaurant/${restaurantId}/entities`, {
          headers: {
            'Authorization': `Bearer ${restaurantToken}`
          },
        });
        setEmployees(res.data.employees);
        setRobots(res.data.robots);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchData();
  }, [restaurantId]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Restaurant Dashboard</h1>
        <button className="add-menu-btn" onClick={() => navigate('/add-menu-item')}>+ Add Menu Item</button>
      </div>
      <div className="dashboard-grid">
        <EmployeeList employees={employees} onAdd={() => navigate('/employee-signup')} />
        <RobotList robots={robots} onAdd={() => navigate('/robot-signup')} restaurantId={restaurantId} />
      </div>
    </div>
  );
};

export default RestaurantDashboard;
