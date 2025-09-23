import './QuizForm.css';
import CategoryPicker from './CategoryPicker/CategoryPicker';
import RadioButtons from './RadioButtons/RadioButtons';
import QuestionCounter from './QuestionCounter/QuestionCounter';

function QuizForm({ collapsed }) {
  return (
    <div className="quiz-grid">
      <div>Select Category</div>
      <div>Number of Questions</div>
      <div>Select Difficulty</div>

      <CategoryPicker />
      <QuestionCounter />
      <RadioButtons />
    </div>
  );
}

export default QuizForm;
