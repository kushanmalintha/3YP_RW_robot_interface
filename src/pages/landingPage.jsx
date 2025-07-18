import React from 'react';
import RoleCard from '../components/roleCard';
import adminImg from '../assets/restaurant.svg';
import robotImg from '../assets/robot.svg';
import employeeImg from '../assets/employee.svg';
import './styles/landingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="blur-box">
        <div className="blur-box-inner">
          <div className="title-wrapper">
            <h1 className="landing-title">
              <span className="title-highlight">Smart Restaurant</span>
              <span className="title-accent">System</span>
            </h1>
            <div className="title-underline"></div>
          </div>
          <p className="landing-subtitle">
            Choose how you'd like to continue
          </p>
          <div className="floating-elements">
            <div className="floating-dot dot-1"></div>
            <div className="floating-dot dot-2"></div>
            <div className="floating-dot dot-3"></div>
          </div>
        </div>
        <div className="blur-box-glow"></div>
      </div>
      <div className="role-selection">
        <RoleCard
          image="https://img.icons8.com/?size=160&id=115346&format=png"
          title="Restaurant Login"
          description="Manage restaurant, employees, and robots"
          onClick={() => navigate('/restaurant-login')}
        />
        <RoleCard
          image="https://img.icons8.com/?size=96&id=23347&format=png"
          title="Employee Login"
          description="Assist restaurant operations and customer service"
          onClick={() => window.location.href = import.meta.env.VITE_EMPLOYEE_APP_URL}
        />
        <RoleCard
          image="https://img.icons8.com/?size=128&id=b2rw9AoJdaQb&format=png"
          title="Robot Login"
          description="Serve customers with menu and ordering"
          onClick={() => navigate('/robot-login')}
        />
      </div>
    </div>
  );
};

export default LandingPage;
