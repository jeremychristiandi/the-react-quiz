function Progress({ idx, numQuestions, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={idx + Number(answer !== null)} />
      <p>
        Question{" "}
        <strong>
          {idx + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {maxPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
