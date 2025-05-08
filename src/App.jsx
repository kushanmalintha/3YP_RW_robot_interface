import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landingPage';
import RestaurantSignupPage from './pages/restaurantSignupPage';
import RestaurantLoginPage from './pages/restaurantLoginPage';
import RobotSignupPage from './pages/robotSignupPage';
import RobotLoginPage from './pages/robotLoginPage';
import RestaurantDashboardPage from './pages/restaurantDashboardPage';
import EmployeeSignupPage from './pages/employeeSignupPage';
import RestaurantMenuPage from './pages/restaurantMenuPage';
import AddMenuItemPage from './pages/addMenuItemPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurant-signup" element={<RestaurantSignupPage />} />
        <Route path="/restaurant-login" element={<RestaurantLoginPage />} />
        <Route path="/robot-signup" element={<RobotSignupPage />} />
        <Route path="/robot-login" element={<RobotLoginPage />} />
        <Route path="/dashboard" element={<RestaurantDashboardPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/employee-signup" element={<EmployeeSignupPage />} />
        <Route path="/restaurant-menu" element={<RestaurantMenuPage />} />
        <Route path="/add-menu-item" element={<AddMenuItemPage />} />
      </Routes>
    </Router>
  );
};

export default App;
