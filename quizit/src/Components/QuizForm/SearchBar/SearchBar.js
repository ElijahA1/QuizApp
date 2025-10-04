import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange, onSubmit }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
}

export default SearchBar;