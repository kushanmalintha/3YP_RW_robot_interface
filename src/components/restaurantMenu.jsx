import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../pages/styles/menuItemList.css';

const AllMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const restaurantId = localStorage.getItem('restaurantId');

  const fetchMenu = async () => {
    try {
      const res = await api.get(`/api/restaurant/${restaurantId}/menuRobot`);
      const allItems = res.data.menu.map((item) => ({
        name: item.name,
        includes: typeof item.Includings === 'string'
          ? item.Includings.split(',').map(i => i.trim())
          : [],
        image: item.imageUrl,
        price: item.price,
        menuNumber: item.menuNumber,
        category: item.category,
      }));
      setMenuItems(allItems);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [restaurantId]);

  return (
    <div className="item-list">
      <h2>All Menu Items</h2>
      <div className="item-grid">
        {menuItems.map((item, idx) => (
          <div key={idx} className="menu-item-card">
            <div className="menu-number-badge">#{item.menuNumber}</div>
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <h4>{item.name}</h4>
            <p><strong>Price:</strong> {item.price} LKR</p>
            <p><strong>Category:</strong> {item.category}</p>
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

export default AllMenuItems;



// import React, { useEffect, useState } from 'react';
// import MenuCategoryList from './menuCategoryList';
// import MenuItemList from './menuItemList';
// import api from '../api/api';

// const RestaurantMenu = () => {
//   const [menuData, setMenuData] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const restaurantId = localStorage.getItem('restaurantId');

//   // Move fetchMenu outside useEffect so it can be called elsewhere
//   const fetchMenu = async () => {
//     try {
//       const res = await api.get(`/api/restaurant/${restaurantId}/menuRobot`);
//       console.log('Menu data:', res.data.menu);
//       const grouped = res.data.menu.reduce((acc, item) => {
//         if (!acc[item.category]) acc[item.category] = [];
//         acc[item.category].push({
//           name: item.name,
//           includes: typeof item.Includings === 'string'
//             ? item.Includings.split(',').map(i => i.trim())
//             : [],
//           image: item.imageUrl,
//           price: item.price,
//           menuNumber: item.menuNumber,
//         });
//         return acc;
//       }, {});
//       setMenuData(grouped);
//     } catch (err) {
//       console.error('Failed to fetch menu:', err);
//     }
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, [restaurantId]);

//   return (
//     <div className="restaurant-menu">
//       <h2>Restaurant Menu</h2>
//       {!selectedCategory ? (
//         <MenuCategoryList
//           categories={Object.keys(menuData)}
//           onSelectCategory={async (cat) => {
//             await fetchMenu();
//             setSelectedCategory(cat);
//           }}
//         />
//       ) : (
//         <MenuItemList
//           items={menuData[selectedCategory]}
//           category={selectedCategory}
//           onBack={() => setSelectedCategory(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default RestaurantMenu;
