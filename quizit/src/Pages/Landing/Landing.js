import './Landing.css';
import { useState } from 'react';
import SideBar from './Components/SideBar/SideBar';
import QuizForm from './Components/QuizForm/QuizForm';
import QuestionGenerator from './Components/QuestionGenerator/QuestionGenerator';

function Landing() {
  // Tracks the currently selected difficulty level from the quiz form
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="Landing">
      <SideBar />
      <div className="Content">
        <h1 className="ContentHeader">This is the header</h1>

        {/* Quiz setup form */}
        <QuizForm
          setSelectedDifficulty={setSelectedDifficulty}
          questionLimiter={setQuestionCount}
          setSearchTerm={setSearchTerm}
        />

        {/* Displays questions filtered by selected difficulty */}
        <QuestionGenerator
          selectedDifficulty={selectedDifficulty}
          questionLimit={questionCount}
          searchTerm={searchTerm}
        />

        <footer>This is the footer</footer>
      </div>
    </div>
  );
}

export default Landing;