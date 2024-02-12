import { useQuiz } from "../QuizContext";

function NextButton() {
  const { nextQuestion, finished, answer, index, numQuestions } = useQuiz();

  if (answer === null) return;

  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={nextQuestion}>
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={finished}>
        Finish
      </button>
    );
}

export default NextButton;
