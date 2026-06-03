import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>AI Interview Simulator</h1>

      <p>
        Practice technical interviews and improve your skills.
      </p>

      <button onClick={() => navigate("/setup")}>
        Start Interview
      </button>
    </div>
  );
}

export default Home;