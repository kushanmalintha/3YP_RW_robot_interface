import React from 'react';
import RoleCard from '../components/roleCard';
import adminImg from '../assets/restaurant.svg';
import robotImg from '../assets/robot.svg';
import employeeImg from '../assets/employee.svg';
import './styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Smart Restaurant System</h1>
      <p className="landing-subtitle">Choose how you'd like to continue</p>

      <div className="role-selection">
        <RoleCard
          image={adminImg}
          title="Restaurant Login"
          description="Manage restaurant, employees, and robots"
          onClick={() => navigate('/restaurant-login')}
        />
        <RoleCard
          image={robotImg}
          title="Robot Login"
          description="Serve customers with menu and ordering"
          onClick={() => navigate('/robot-login')}
        />
      <RoleCard
        image={employeeImg}
        title="Employee Login"
        description="Assist restaurant operations and customer service"
        onClick={() => window.location.href = import.meta.env.VITE_EMPLOYEE_APP_URL}
      />
      </div>
    </div>
  );
};

export default LandingPage;
