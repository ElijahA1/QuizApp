import './App.css';
import { useState } from 'react';
import SideBar from './Components/SideBar/SideBar';
import QuizForm from './Components/QuizForm/QuizForm';
import QuestionGenerator from './Components/QuestionGenerator/QuestionGenerator';

function App() {
  // Tracks the currently selected difficulty level from the quiz form
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  return (
    <div className="App">
      <SideBar />
      <div className="Content">
        <h1 className="ContentHeader">This is the header</h1>

        {/* Quiz setup form */}
        <QuizForm setSelectedDifficulty={setSelectedDifficulty} />

        {/* Displays questions filtered by selected difficulty */}
        <QuestionGenerator selectedDifficulty={selectedDifficulty} />

        <footer>This is the footer</footer>
      </div>
    </div>
  );
}

export default App;