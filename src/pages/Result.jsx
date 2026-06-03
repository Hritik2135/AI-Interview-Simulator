function Result() {
  const answers =
    JSON.parse(localStorage.getItem("answers")) || [];

  return (
    <div className="container">
      <h1>Interview Completed</h1>

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