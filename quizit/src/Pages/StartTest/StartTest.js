import './StartTest.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Use import for testing with mock data
//import questionsData from '../../Assets/mock/questions.json';
const API_BASE = process.env.REACT_APP_API_BASE_URL ?? "http://192.168.40.191:5072";

function StartTest() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { difficulty, numQuestions, timerMinutes } = state || {};

  const [allQuestions, setAllQuestions] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(timerMinutes * 60);

  //Load questions
  useEffect(() => {
    fetch(`${API_BASE}/api/questions`)
      .then(res => res.json())
      .then(data => setAllQuestions(data))
      .catch(err => console.error('Failed to load questions:', err));
  }, []);

  // For Testing with mock data
    // useEffect(() => {
    //   setAllQuestions(questionsData);
    // }, []);


  // Filter and randomize questions
  useEffect(() => {
    if (allQuestions.length === 0) return;

    const filtered = allQuestions.filter(q => q.difficulty === difficulty);
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, numQuestions);

    const allAnswers = allQuestions.map(q => q.answer);

    const withChoices = selected.map(q => {
      const incorrect = allAnswers.filter(a => a !== q.answer).sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [q.answer, ...incorrect].sort(() => 0.5 - Math.random());
      return { ...q, options };
    });

    setTestQuestions(withChoices);
  }, [allQuestions, difficulty, numQuestions]);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < testQuestions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    navigate('/test/score', {
    state: {
        questions: testQuestions,
        selectedAnswers
    }
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentQuestion = testQuestions[currentIndex];

  return (
    <div className="StartTest">
      <div className="Timer">{formatTime(timeLeft)}</div>

      {currentQuestion ? (
        <div className="QuestionCard">
          <h3>Question {currentIndex + 1} of {testQuestions.length}</h3>
          <p className="QuestionText">{currentQuestion.question}</p>

          <form className="Options">
            {currentQuestion.options.map((opt, idx) => (
              <label key={idx} className="Option">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={opt}
                  checked={selectedAnswers[currentQuestion.id] === opt}
                  onChange={() => handleAnswerSelect(currentQuestion.id, opt)}
                />
                <span>{String.fromCharCode(65 + idx)}. {opt}</span>
              </label>
            ))}
          </form>

          <div className="NavButtons">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
            {currentIndex < testQuestions.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button className="SubmitBtn" onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default StartTest;