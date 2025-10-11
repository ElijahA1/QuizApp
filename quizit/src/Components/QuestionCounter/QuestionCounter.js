// Text box like component that will only take numeric input from unsigned 1-20

import React, { useState } from 'react';
import './QuestionCounter.css';

function QuestionCounter({ onCountChange }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;

    if (input === '') {
      setValue('');
      onCountChange(0); // or null
      return;
    }

    const num = Number(input);
    if (/^\d+$/.test(input) && num > 0 && num <= 20) {
      setValue(input);
      onCountChange(num);
    }
  };

  return (
    <div className="question-counter">
      <input
        type="text"
        id="question-count"
        value={value}
        onChange={handleChange}
        placeholder="Enter a number 1-20"
        inputMode="numeric"
      />
    </div>
  );
}

export default QuestionCounter;
