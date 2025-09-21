// Component currently displays dummy data from a category array

import React, { useState } from 'react';
import './CategoryPicker.css';

function CategoryPicker() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'General Knowledge',
    'Science',
    'History',
    'Geography',
    'Entertainment',
    'Sports'
  ];

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log('Selected category:', e.target.value);
  };

  return (
    <div className="category-picker">
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option value="">--Please choose an option--</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}


export default CategoryPicker;