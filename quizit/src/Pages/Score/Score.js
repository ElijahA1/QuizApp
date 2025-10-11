import './Score.css';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';

function Score() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { questions = [], selectedAnswers = {} } = state || {};

  const getScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const { correct, total, percentage } = getScore();

  return (
    <div className="ScorePage">
      <SideBar />
      <div className="ScoreContent">
        <h2>Test Results</h2>
        <div className="ScoreBox">
          <p><strong>Correct Answers:</strong> {correct}</p>
          <p><strong>Total Questions:</strong> {total}</p>
          <p><strong>Score:</strong> {percentage}%</p>
        </div>

        <div className="ScoreActions">
          <button onClick={() => navigate('/test')}>Retake Test</button>
          <button onClick={() => navigate('/')}>Return Home</button>
        </div>
      </div>
    </div>
  );
}

export default Score;