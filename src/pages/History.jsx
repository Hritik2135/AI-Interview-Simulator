function History() {
  const history =
    JSON.parse(localStorage.getItem("history")) || [];
    const totalInterviews = history.length;

const bestScore =
  history.length > 0
    ? Math.max(...history.map((item) => item.score))
    : 0;

const averageScore =
  history.length > 0
    ? (
        history.reduce(
          (sum, item) => sum + item.score,
          0
        ) / history.length
      ).toFixed(1)
    : 0;

  return (
    <div className="container">
      <h1>Interview History</h1>
      <div
  style={{
    background: "#f3f4f6",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  }}
>
  <h2>📊 Dashboard</h2>

  <p>
    <strong>Total Interviews:</strong>{" "}
    {totalInterviews}
  </p>

  <p>
    <strong>Best Score:</strong>{" "}
    {bestScore}/9
  </p>

  <p>
    <strong>Average Score:</strong>{" "}
    {averageScore}/9
  </p>
</div>

      {history.length === 0 ? (
        <p>No interviews found.</p>
      ) : (
        history.map((item, index) => (
          <div key={index}>
            <h3>Interview {index + 1}</h3>

            <p>
              <strong>Date:</strong>{" "}
              {item.date}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {item.role}
            </p>

            <p>
              <strong>Difficulty:</strong>{" "}
              {item.difficulty}
            </p>

            <p>
              <strong>Score:</strong>{" "}
              {item.score}/9
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default History;