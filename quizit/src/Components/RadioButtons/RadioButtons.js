import './RadioButtons.css';

// Renders difficulty selection radio buttons and updates parent state on change
function RadioButtons({ setSelectedDifficulty }) {
  const handleChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  return (
    <div className="radio-buttons">
      <label>
        <input
          type="radio"
          name="difficulty"
          value="Basic"
          onChange={handleChange}
        />
        Basic
      </label>
      <label>
        <input
          type="radio"
          name="difficulty"
          value="Intermediate"
          onChange={handleChange}
        />
        Intermediate
      </label>
      <label>
        <input
          type="radio"
          name="difficulty"
          value="Advanced"
          onChange={handleChange}
        />
        Advanced
      </label>
    </div>
  );
}

export default RadioButtons;