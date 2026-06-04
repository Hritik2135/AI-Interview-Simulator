import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function History() {
  const navigate = useNavigate();

  const history =
    JSON.parse(localStorage.getItem("history")) || [];

  const totalInterviews = history.length;

  const bestScore =
    history.length > 0
      ? Math.max(
          ...history.map((item) => item.score)
        )
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

  const chartData = history.map(
    (item, index) => ({
      interview: index + 1,
      score: item.score,
    })
  );

  const clearHistory = () => {
    localStorage.removeItem("history");
    window.location.reload();
  };

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

      {history.length > 0 && (
        <>
          <h2>📈 Performance Analytics</h2>

          <div
            style={{
              width: "100%",
              height: "300px",
              marginBottom: "30px",
            }}
          >
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="interview" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {history.length === 0 ? (
        <p>No interviews found.</p>
      ) : (
        history.map((item, index) => {
          let badge = "🌱 Beginner";

          if (item.score >= 9) {
            badge = "🏆 Interview Master";
          } else if (item.score >= 7) {
            badge =
              "🚀 Advanced Candidate";
          } else if (item.score >= 4) {
            badge =
              "⭐ Rising Developer";
          }

          return (
            <div key={index}>
              <h3>
                Interview {index + 1}
              </h3>

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

              <p>
                <strong>Badge:</strong>{" "}
                {badge}
              </p>

              <hr />
            </div>
          );
        })
      )}

      <button onClick={clearHistory}>
        🗑️ Clear History
      </button>

      <br />
      <br />

      <button
        onClick={() => navigate("/")}
      >
        🏠 Back To Home
      </button>
    </div>
  );
}

export default History;