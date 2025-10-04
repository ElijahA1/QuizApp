// Component for displaying and navigating through quiz questions
// Questions are loaded from /public/mock/questions.json
// This component is designed to work with filters from the QuizForm (integration pending)

import './QuestionGenerator.css';
import { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? "http://192.168.40.191:5072";

// Displays and navigates quiz questions filtered by selected difficulty
function QuestionGenerator({ selectedDifficulty, questionLimit, searchTerm }) {
  // Stores all questions loaded from the JSON file
  const [allQuestions, setAllQuestions] = useState([]);

  // Stores only the questions that match the selected difficulty
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  // Tracks which question is currently being displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  // Controls whether the answer is shown or hidden
  const [showAnswer, setShowAnswer] = useState(false);

  // Load all questions once when the component mounts
  useEffect(() => {
    fetch(`${API_BASE}/api/questions`)
      .then((res) => res.json())
      .then((data) => setAllQuestions(data))
      .catch((err) => console.error('Failed to load questions:', err));
  }, []);

 // Filters
  useEffect(() => {
    // Filter by difficulty
    let filtered = selectedDifficulty
      ? allQuestions.filter(q => q.difficulty === selectedDifficulty)
      : allQuestions;

      // Limit Questions
      if (questionLimit > 0) {
      filtered = filtered.slice(0, questionLimit);

      // Filter by search
      if (searchTerm.trim()) {
        const lower = searchTerm.toLowerCase();
        filtered = filtered.filter(q =>
          q.question.toLowerCase().includes(lower) ||
          q.answer.toLowerCase().includes(lower)
        );
      }
    }

    setFilteredQuestions(filtered);
    setCurrentIndex(0);       // Reset to first question
    setShowAnswer(false);     // Hide answer on filter change
  }, [selectedDifficulty, allQuestions, questionLimit, searchTerm]);

  // Advance to the next question, if not at the end
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1 < filteredQuestions.length ? prev + 1 : prev));
    setShowAnswer(false);
  };

  // Go back to the previous question, if not at the beginning
  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
    setShowAnswer(false);
  };

  // Toggle answer visibility
  const handleReveal = () => {
    setShowAnswer(prev => !prev);
  };

  // Get the question to display based on current index
  const currentQuestion = filteredQuestions[currentIndex];

  return (
    <div className="QuestionGenerator">
      <label className="QGlabel">Question Generator</label>

      <div className="QuestionPull">
        {/* Previous question button */}
        <button id="PreviousQuestion" onClick={handlePrevious}>&lt;</button>

        <div>
          {/* Display question content if available */}
          {currentQuestion ? (
            <>
              <p><strong>Q:</strong> {currentQuestion.question}</p>
              <p><em>Difficulty:</em> {currentQuestion.difficulty}</p>

              {/* Toggle answer visibility */}
              <button className="RevealButton" onClick={handleReveal}>
                {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
              </button>

              {/* Conditionally show the answer */}
              {showAnswer && (
                <p><strong>Answer:</strong> {currentQuestion.answer}</p>
              )}
            </>
          ) : (
            'No questions available for this difficulty.'
          )}
        </div>

        {/* Next question button */}
        <button id="NextQuestion" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
}

export default QuestionGenerator;