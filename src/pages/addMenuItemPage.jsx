import React from 'react';
import AddMenuItemForm from '../components/addMenuItemForm';
import './styles/menuItemForm.css';

const AddMenuItemPage = () => {
  return (
    <div className="menu-page">
      <h2>Add New Menu Item</h2>
      <AddMenuItemForm />
    </div>
  );
};

export default AddMenuItemPage;
