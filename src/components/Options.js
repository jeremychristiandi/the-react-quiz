import { useQuiz } from "../QuizContext";

function Options() {
  const { questions, index, newAnswer, answer } = useQuiz();
  const question = questions.at(index);

  const isAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer ? "answer" : ""} ${
            isAnswered
              ? idx === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={answer !== null}
          key={option}
          onClick={() => newAnswer(idx)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
