import { useNavigate } from "react-router-dom";
import MenuItem from "../components/MenuItems.jsx";
import "../styles/menu.css";

const menuItems = [
  { id: 1, name: "Pizza", description: "Delicious cheese pizza" },
  { id: 2, name: "Pasta", description: "Creamy Alfredo pasta" },
  { id: 3, name: "Burger", description: "Juicy beef burger with fries" },
];

const MenuPage = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <div className="menu-list">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} onSelect={() => navigate(`/order/${item.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
