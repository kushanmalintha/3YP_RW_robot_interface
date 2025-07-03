import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../pages/styles/menuListColumn.css';

const MenuListColumn = () => {
  const [menuData, setMenuData] = useState({});
  const restaurantId = localStorage.getItem('restaurantId');

  const fetchMenu = async () => {
    const restaurantToken = localStorage.getItem('restaurantToken');
    if (!restaurantToken) {
      console.error("No token found. Please log in.");
      return;
    }
    try {
      // Fetching the menu data from the backend
      const res = await api.get(`/api/restaurant/${restaurantId}/menu`,{
        headers: {
          'Authorization': `Bearer ${restaurantToken}`
        },
      });

      // Grouping the menu data by category
      const grouped = res.data.menu.reduce((acc, item) => {
        const cat = item.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {});
      setMenuData(grouped);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    const restaurantToken = localStorage.getItem('restaurantToken');
    if (!restaurantToken) {
      console.error("No token found. Please log in.");
      return;
    }
    try {
      await api.delete(`/api/restaurant/${restaurantId}/menu/${id}`, {
        headers: {
          'Authorization': `Bearer ${restaurantToken}`
        },
      });  // Use item id for deletion
      fetchMenu(); // Refresh the menu after deletion
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
  };

  return (
    <div className="menu-list">
      {Object.entries(menuData).map(([category, items]) => (
        <div key={category} className="menu-category">
          <h3>{category}</h3>
          <ul>
            {items.map(item => (
              <li
                key={item.id}  // Using the item's 'id' as the unique key
                className="menu-item"
                onClick={() => handleDelete(item.id)} // Pass the item's id for deletion
                title="Click to delete"
              >
                <img src={item.imageUrl} alt={item.name} />
                <div className="menu-item-info">
                  <strong>{item.name}</strong>
                  <p>{item.Includings}</p>
                  <p><strong>Menu Number:</strong> {item.menuNumber}</p> {/* Display Menu Number */}
                  <p>Rs. {item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MenuListColumn;
