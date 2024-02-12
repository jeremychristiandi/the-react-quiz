function FinishedScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  let emoji;

  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🤩";
  if (percentage >= 50 && percentage < 80) emoji = "😺";
  if (percentage > 0 && percentage < 50) emoji = "😥";

  return (
    <div>
      <p className="result">
        {emoji} Total points <strong>{points}</strong> out of {maxPoints} (
        {percentage}
        %)
      </p>
      <p className="highscore">Highscore: {highscore} pts</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default FinishedScreen;
