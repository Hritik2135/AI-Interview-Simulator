import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>🚀 AI Interview Simulator</h1>

      <p>
        Practice interviews, improve confidence and get
        placement-ready with AI powered mock interviews.
      </p>

      <button onClick={() => navigate("/setup")}>
        Start Interview
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/history")}>
        View History
      </button>
    </div>
  );
}

export default Home;