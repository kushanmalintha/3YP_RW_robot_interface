import React from 'react';
import categoryIcons from '../assets/categoryIcons';
import '../pages/styles/menuCategoryList.css';

const MenuCategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-list">
      {categories.map((cat) => {
        const icon = categoryIcons[cat] || categoryIcons.default;
        return (
          <div key={cat} className="category-card" onClick={() => onSelectCategory(cat)}>
            <span className="category-icon">
              {typeof icon === 'string' && icon.startsWith('http') ? (
                <img src={icon} alt={cat} style={{ width: 32, height: 32 }} />
              ) : (
                icon
              )}
            </span>
            <div className="category-title">{cat}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuCategoryList;
