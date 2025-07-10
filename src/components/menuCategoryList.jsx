import React from 'react';
import categoryIcons from '../assets/categoryIcons';
import '../pages/styles/menuCategoryList.css';
import '../components/restaurantMenu.jsx';

const MenuCategoryList = ({ categories, onSelectCategory, fetchMenu }) => {
  return (
    <div className="category-list">
      {categories.map((cat, index) => {
        const icon = categoryIcons[cat] || categoryIcons.default;
        return (
          <div
            key={cat}
            className="category-card"
            onClick={async () => {
              if (fetchMenu) await fetchMenu();
              onSelectCategory(cat);
            }}
            style={{ '--animation-delay': `${index * 0.1}s` }}
          >
            <div className="category-card-inner">
              <div className="icon-container">
                <span className="category-icon">
                  {typeof icon === 'string' && icon.startsWith('http') ? (
                    <img src={icon} alt={cat} className="category-icon-img" />
                  ) : (
                    icon
                  )}
                </span>
                <div className="icon-glow"></div>
              </div>
              <div className="category-title">{cat}</div>
              <div className="category-accent"></div>
            </div>
            <div className="card-shimmer"></div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuCategoryList;