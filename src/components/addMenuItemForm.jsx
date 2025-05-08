import React, { useState } from 'react';
import api from '../api/api';

const AddMenuItemForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    Ingredients: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const restaurantId = localStorage.getItem('restaurantId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/restaurant/menu', { ...formData, restaurantId });
      alert('Menu item added!');
      // clear the form after submission
      setFormData({
        category: '',
        name: '',
        Ingredients: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Error submitting menu item:', error);
    }
  };  

  return (
    <form className="menu-item-form" onSubmit={handleSubmit}>
      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
      </label>
      <label>
        Item Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Ingredients:
        <textarea name="Ingredients" value={formData.Ingredients} onChange={handleChange} required />
      </label>
      <label>
        Image URL:
        <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddMenuItemForm;
