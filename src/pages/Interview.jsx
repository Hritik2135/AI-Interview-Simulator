import { useState, useEffect } from "react";
import questions from "../data/questions";
import { useNavigate } from "react-router-dom";

function Interview() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const difficulty = localStorage.getItem("difficulty");

  const selectedQuestions =
    questions[role][difficulty];

  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");

  const [timeLeft, setTimeLeft] =
    useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in your browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setAnswer(
        event.results[0][0].transcript
      );
    };

    recognition.start();
  };

  const nextQuestion = () => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] =
      answer;

    setAnswers(updatedAnswers);

    setAnswer("");

    if (
      currentQuestion <
      selectedQuestions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );

      setTimeLeft(30);
    } else {
      localStorage.setItem(
        "answers",
        JSON.stringify(updatedAnswers)
      );

      navigate("/result");
    }
  };

  return (
    <div className="container">
      <h1>Interview Questions</h1>

      <p>
        <strong>Name:</strong> {name}
      </p>

      <p>
        <strong>Role:</strong> {role}
      </p>

      <p>
        <strong>Difficulty:</strong>{" "}
        {difficulty}
      </p>

      <h2>
        ⏱️ Time Left: {timeLeft}s
      </h2>

      <p>
        Question {currentQuestion + 1} of{" "}
        {selectedQuestions.length}
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${
              ((currentQuestion + 1) /
                selectedQuestions.length) *
              100
            }%`,
          }}
        ></div>
      </div>

      <h2>
        {
          selectedQuestions[
            currentQuestion
          ].question
        }
      </h2>

      <textarea
        rows="6"
        cols="50"
        placeholder="Write your answer here"
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
      ></textarea>

      <br />
      <br />

      <button onClick={startListening}>
        🎤 Speak Answer
      </button>

      <br />
      <br />

      <button onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default Interview;