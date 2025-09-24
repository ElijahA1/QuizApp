import React, { useState } from 'react';
import './CategoryPicker.css';

// Renders a dropdown for selecting a quiz category (currently using static data)
function CategoryPicker() {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Static list of available categories
  const categories = [
    'General Knowledge',
    'Science',
    'History',
    'Geography',
    'Entertainment',
    'Sports'
  ];

  // Update selected category on change
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
