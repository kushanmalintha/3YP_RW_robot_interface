import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../pages/styles/menuItemForm.css';

const AddMenuItemForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    Includings: '',
    price: '',
    imageUrl: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const restaurantId = localStorage.getItem('restaurantId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurantId) {
      alert('Restaurant ID not found.');
      return;
    }

    try {
      await api.post(`/api/restaurant/${restaurantId}/add-menu`, { ...formData, restaurantId });

      alert('Menu item added!');
      setFormData({
        category: '',
        name: '',
        Includings: '',
        price: '',
        imageUrl: ''
      });
      navigate(0); // Reload the page
    } catch (error) {
      console.error('Error submitting menu item:', error);
      alert('Error adding menu item. Please try again.');
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
        Includings:
        <textarea name="Includings" value={formData.Includings} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="1"
        />
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
