import './App.css';
import SideBar from './Components/SideBar/SideBar';
import QuizForm from './Components/QuizForm/QuizForm'
import QuestionGenerator from './Components/QuestionGenerator/QuestionGenerator';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <div className="Content">
        <h1 className="ContentHeader">This is the header</h1>
        <QuizForm/>
        <QuestionGenerator/>
        <footer>This is the footer</footer>
      </div>
    </div>
  );
}

export default App;
