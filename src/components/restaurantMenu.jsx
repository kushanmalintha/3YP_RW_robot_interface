import React, { useEffect, useState } from 'react';
import MenuCategoryList from './menuCategoryList';
import MenuItemList from './menuItemList';
import api from '../api/api';

const RestaurantMenu = () => {
  const [menuData, setMenuData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const restaurantId = localStorage.getItem('restaurantId');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/api/restaurant/${restaurantId}/menu`);
        console.log('Menu data:', res.data.menuItems);
        const grouped = res.data.menuItems.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push({
            name: item.name,
            includes: item.Ingredients.split(',').map(i => i.trim()),
            image: item.imageUrl,
          });
          return acc;
        }, {});
        setMenuData(grouped);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  return (
    <div className="restaurant-menu">
      <h2>Restaurant Menu</h2>
      {!selectedCategory ? (
        <MenuCategoryList
          categories={Object.keys(menuData)}
          onSelectCategory={setSelectedCategory}
        />
      ) : (
        <MenuItemList
          items={menuData[selectedCategory]}
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
};

export default RestaurantMenu;
