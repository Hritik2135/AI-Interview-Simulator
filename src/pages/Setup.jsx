import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Setup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("Java Developer");
  const [difficulty, setDifficulty] = useState("Easy");

  const startInterview = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("difficulty", difficulty);

    navigate("/interview");
  };

  return (
    <div className="container">
      <h1>Interview Setup</h1>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Java Developer</option>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
      </select>

      <br /><br />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <br /><br />

      <button onClick={startInterview}>
        Start Interview
      </button>
    </div>
  );
}

export default Setup;