import { createContext, useContext, useEffect, useReducer } from "react";

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  time: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        time: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action is unknown!");
  }
}

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, time },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  function start() {
    dispatch({ type: "start" });
  }

  function newAnswer(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  function tick() {
    dispatch({ type: "tick" });
  }

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finished() {
    dispatch({ type: "finished" });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        time,
        numQuestions,
        maxPoints,
        newAnswer,
        start,
        tick,
        nextQuestion,
        finished,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("Context is defined outside the QuizProvider.");

  return context;
}

export { useQuiz, QuizProvider };
