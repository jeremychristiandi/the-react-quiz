import { useEffect } from "react";
import { useQuiz } from "../QuizContext";

function Timer() {
  const { tick, time } = useQuiz();

  const mins = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        tick();
      }, 1000);

      return () => clearInterval(id);
    },
    [tick]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
