import { useState } from 'react';
import './QuizForm.css';
import SearchBar from '../SearchBar/SearchBar';
import RadioButtons from '../RadioButtons/RadioButtons';
import QuestionCounter from '../QuestionCounter/QuestionCounter';

// Renders the quiz setup form with category, question count, and difficulty selection
function QuizForm({ setSelectedDifficulty, questionLimiter, setSearchTerm  }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (text) => {
    setSearchValue(text);
    setSearchTerm(text); // pass up to parent for filtering
  };

  return (
    <div className="quiz-grid">
      <div>Search by Content</div>
      <div>Limit Questions</div>
      <div>Select Difficulty</div>

      <SearchBar value={searchValue} onChange={handleSearchChange} onSubmit={setSearchTerm} />
      <QuestionCounter onCountChange={questionLimiter}/>
      <RadioButtons setSelectedDifficulty={setSelectedDifficulty} />
    </div>
  );
}

export default QuizForm;