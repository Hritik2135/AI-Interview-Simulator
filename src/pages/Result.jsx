import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import questions from "../data/questions";

function Result() {
  const navigate = useNavigate();

  const answers =
    JSON.parse(localStorage.getItem("answers")) || [];

  const role = localStorage.getItem("role");
  const difficulty = localStorage.getItem("difficulty");

  const selectedQuestions =
    questions[role][difficulty];

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

  useEffect(() => {
    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    const newEntry = {
      date: new Date().toLocaleDateString(),
      role,
      difficulty,
      score,
    };

    const alreadySaved =
      history.length > 0 &&
      history[history.length - 1].role === role &&
      history[history.length - 1].difficulty === difficulty &&
      history[history.length - 1].score === score;

    if (!alreadySaved) {
      history.push(newEntry);

      localStorage.setItem(
        "history",
        JSON.stringify(history)
      );
    }
  }, []);

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

      {answers.map((answer, index) => {
        let answerScore = 0;

        if (answer.length > 100) {
          answerScore = 3;
        } else if (answer.length > 50) {
          answerScore = 2;
        } else if (answer.length > 10) {
          answerScore = 1;
        }

        return (
          <div key={index}>
            <h3>
              Question {index + 1}
            </h3>

            <p>
              <strong>Question:</strong>{" "}
              {selectedQuestions[index].question}
            </p>

            <p>
              <strong>Your Answer:</strong>{" "}
              {answer}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {"⭐".repeat(answerScore)}
            </p>

            <hr />
          </div>
        );
      })}

      <button
        onClick={() => {
          localStorage.removeItem("answers");
          navigate("/");
        }}
      >
        Restart Interview
      </button>
    </div>
  );
}

export default Result;