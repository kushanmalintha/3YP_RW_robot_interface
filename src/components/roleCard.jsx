import React from 'react';
import './roleCard.css';

const RoleCard = ({ image, title, description, onClick }) => {
  return (
    <div className="role-card" onClick={onClick}>
      <img src={image} alt={title} className="role-image" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default RoleCard;
