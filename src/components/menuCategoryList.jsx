import React from 'react';
import categoryIcons from '../assets/categoryIcons';
import '../pages/styles/menuCategoryList.css';

const MenuCategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <div key={cat} className="category-card" onClick={() => onSelectCategory(cat)}>
          <span className="category-icon">{categoryIcons[cat] || categoryIcons.default}</span>
          <div className="category-title">{cat}</div>
        </div>
      ))}
    </div>
  );
};

export default MenuCategoryList;
