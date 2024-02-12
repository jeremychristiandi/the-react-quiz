import { useQuiz } from "../QuizContext";

function StartScreen() {
  const { totalQuestions, start } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{totalQuestions} questions to test your React knowledge.</h3>
      <button className="btn btn-ui" onClick={start}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
