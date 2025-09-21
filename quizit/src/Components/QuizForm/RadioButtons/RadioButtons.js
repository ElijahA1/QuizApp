import React, { useState } from 'react';
import './RadioButtons.css';

function RadioButtons() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleChange = (e) => {
    setSelectedDifficulty(e.target.value);
    console.log('Selected difficulty:', e.target.value);
  };

  return (
    <div className="radio-buttons">
      <label>
        <input
          type="radio"
          name="difficulty"
          value="easy"
          checked={selectedDifficulty === 'easy'}
          onChange={handleChange}
        />
        Easy
      </label>
      <label>
        <input
          type="radio"
          name="difficulty"
          value="medium"
          checked={selectedDifficulty === 'medium'}
          onChange={handleChange}
        />
        Medium
      </label>
      <label>
        <input
          type="radio"
          name="difficulty"
          value="hard"
          checked={selectedDifficulty === 'hard'}
          onChange={handleChange}
        />
        Hard
      </label>
    </div>
  );
}

export default RadioButtons;
