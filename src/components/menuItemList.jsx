import React from 'react';
import '../pages/styles/menuItemList.css';

const MenuItemList = ({ items, category, onBack }) => {
  return (
    <div className="item-list">
      <button className="back-button" onClick={onBack}>← Back</button>
      <h3>{category}</h3>
      <div className="item-grid">
        {items.map((item) => (
          <div key={item.name} className="menu-item-card">
            <div className="menu-number-badge">#{item.menuNumber}</div>
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <h4>{item.name}</h4>
            <p><strong>Price:</strong> {item.price} LKR</p>
            {item.includes && item.includes.length > 0 && (
              <>
                <p><strong>Includes:</strong></p>
                <ul>
                  {item.includes.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </>
            )}
        </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItemList;
