import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Setup() {
  const navigate = useNavigate();

  const [name, setName] = useState(
  localStorage.getItem("name") || ""
);
  const [company, setCompany] = useState("Google");
  const [role, setRole] = useState("Java Developer");
  const [difficulty, setDifficulty] = useState("Easy");


  const startInterview = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("company", company);
    localStorage.setItem("role", role);
    localStorage.setItem("difficulty", difficulty);

    navigate("/interview");
  };

  return (
    <div className="container">
      <h1>🚀 Interview Setup</h1>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <label>
        <strong>Select Company</strong>
      </label>

      <br />

      <select
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      >
        <option value="Google">Google</option>
        <option value="Amazon">Amazon</option>
        <option value="Microsoft">Microsoft</option>
        <option value="TCS">TCS</option>
        <option value="Infosys">Infosys</option>
        <option value="Wipro">Wipro</option>
      </select>

      <br />
      <br />

      <label>
        <strong>Select Role</strong>
      </label>

      <br />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Java Developer">
          Java Developer
        </option>

        <option value="Frontend Developer">
          Frontend Developer
        </option>

        <option value="Backend Developer">
          Backend Developer
        </option>
      </select>

      <br />
      <br />

      <label>
        <strong>Select Difficulty</strong>
      </label>

      <br />

      <select
        value={difficulty}
        onChange={(e) =>
          setDifficulty(e.target.value)
        }
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <br />
      <br />

      <button onClick={startInterview}>
        Start Interview
      </button>
    </div>
  );
}

export default Setup;