import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("name");

  return (
    <div className="container">
      <h1>🚀 AI Interview Simulator</h1>

      <p>
        AI Powered Mock Interview Platform
        for Placement Preparation
      </p>

      <p>
        Practice interviews, improve confidence and get
        placement-ready with AI powered mock interviews.
      </p>

      <h2>
        Practice • Analyze • Improve • Get Hired
      </h2>

      <h3>
        Welcome, {username}
      </h3>

      <button onClick={() => navigate("/setup")}>
        Start Interview
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/history")}>
        View History
      </button>

      <br />
      <br />

      <button
        onClick={() => {
          localStorage.removeItem("name");
          navigate("/setup");
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Home;