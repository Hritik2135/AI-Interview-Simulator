function Result() {
  const answers =
    JSON.parse(localStorage.getItem("answers")) || [];
    let score = 0;

answers.forEach((answer) => {
  if (answer.length > 100) {
    score += 3;
  } else if (answer.length > 50) {
    score += 2;
  } else if (answer.length > 10) {
    score += 1;
  }
});

  return (
    <div className="container">
      <h1>Interview Completed</h1>
      <h2>Score: {score}/9</h2>

<p>
  {score >= 7
    ? "Excellent Performance 🚀"
    : score >= 4
    ? "Good Job 👍"
    : "Keep Practicing 💪"}
</p>

      <h2>Your Answers</h2>

      {answers.map((answer, index) => (
        <div key={index}>
          <h3>Question {index + 1}</h3>

          <p>{answer}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Result;