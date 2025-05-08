import React from 'react';
import '../pages/styles/menuCategoryList.css';

const MenuCategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <div key={cat} className="category-card" onClick={() => onSelectCategory(cat)}>
          {cat}
        </div>
      ))}
    </div>
  );
};

export default MenuCategoryList;
