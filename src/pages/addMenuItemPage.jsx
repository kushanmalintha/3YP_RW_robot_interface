import React from 'react';
import AddMenuItemForm from '../components/addMenuItemForm';
import MenuListColumn from '../components/menuListColumn';
import './styles/addMenuItemPage.css';

const AddMenuItemPage = () => {
  return (
    <div className="menu-page-two-col">
      <div className="menu-column">
        <h2>Add New Menu Item</h2>
        <AddMenuItemForm />
      </div>
      <div className="menu-column">
        <h2>Current Menu Items</h2>
        <MenuListColumn />
      </div>
    </div>
  );
};

export default AddMenuItemPage;
