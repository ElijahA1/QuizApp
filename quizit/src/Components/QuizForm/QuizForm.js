import './QuizForm.css';
import CategoryPicker from './CategoryPicker/CategoryPicker';
import RadioButtons from './RadioButtons/RadioButtons';
import QuestionCounter from './QuestionCounter/QuestionCounter';

// Renders the quiz setup form with category, question count, and difficulty selection
function QuizForm({ setSelectedDifficulty }) {
  return (
    <div className="quiz-grid">
      <div>Select Category</div>
      <div>Number of Questions</div>
      <div>Select Difficulty</div>

      <CategoryPicker />
      <QuestionCounter />
      <RadioButtons setSelectedDifficulty={setSelectedDifficulty} />
    </div>
  );
}

export default QuizForm;