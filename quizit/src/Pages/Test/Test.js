import './Test.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import QuestionCounter from '../../Components/QuestionCounter/QuestionCounter';
import RadioButtons from '../../Components/RadioButtons/RadioButtons';

function Test() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(15);
  const [difficulty, setDifficulty] = useState('Basic');
  const [questionCount, setQuestionCount] = useState(5);

  const incrementTimer = () => {
    setTimer(prev => (prev < 30 ? prev + 5 : prev));
  };

  const decrementTimer = () => {
    setTimer(prev => (prev > 5 ? prev - 5 : prev));
  };

  const startTest = () => {
    navigate('/test/start', {
      state: {
        difficulty,
        numQuestions: questionCount,
        timerMinutes: timer
      }
    });
  };

  return (
    <div className="Test">
      <SideBar />
      <div className="Content">
        <section className="TestForm">
          <h2>Customize Your Test</h2>

          <div className="FormSection">
            <label>Difficulty:</label>
            <RadioButtons setSelectedDifficulty={setDifficulty} />
          </div>

          <div className="FormSection">
            <label>Number of Questions:</label>
            <QuestionCounter onCountChange={setQuestionCount} />
          </div>

          <div className="FormSection">
            <label>Timer (minutes):</label>
            <div className="TimerControl">
              <button onClick={decrementTimer}>−</button>
              <span>{timer}</span>
              <button onClick={incrementTimer}>+</button>
            </div>
          </div>

          <div className="FormSection">
            <button className="StartButton" onClick={startTest}>Start Test</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Test;