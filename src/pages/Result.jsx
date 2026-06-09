import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import questions from "../data/questions";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import stamp from "../assets/stamp.png";
import signature from "../assets/signature.png";

function Result() {
  const navigate = useNavigate();

  const [aiFeedback, setAiFeedback] = useState("");
  const [aiScore, setAiScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const answers =
    JSON.parse(localStorage.getItem("answers")) || [];
    

    const aiAnswers =
JSON.parse(localStorage.getItem("aiAnswers")) || [];

  const role = localStorage.getItem("role");
  const difficulty =
    localStorage.getItem("difficulty");

  const selectedQuestions =
    questions[role]?.[difficulty] || [];

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

  const feedback = [];

  if (score >= 7) {
    feedback.push(
      "✅ Strong interview performance"
    );
    feedback.push(
      "✅ Detailed answers provided"
    );
  } else if (score >= 4) {
    feedback.push(
      "✅ Good understanding of concepts"
    );
    feedback.push(
      "⚠ Add more details in answers"
    );
  } else {
    feedback.push(
      "⚠ Answers are too short"
    );
    feedback.push(
      "⚠ Explain concepts more clearly"
    );
  }

  useEffect(() => {
    const history =
      JSON.parse(
        localStorage.getItem("history")
      ) || [];

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

  const generateAIFeedback = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            question:
              selectedQuestions
                .map((q) => q.question)
                .join("\n"),
            answer:
              answers.join("\n"),
          }),
        }
      );

      const data =
        await response.json();

      setAiFeedback(
        data.feedback || "No feedback received."
      );

      const match =
        data.feedback?.match(
          /(\d+)\/10/i
        );

      if (match) {
        setAiScore(match[1]);
      }
    } catch (error) {
      console.error(error);

      setAiFeedback(
        "Error: " +
          (error.message ||
            "Failed to generate feedback")
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = () => {
  const doc = new jsPDF("landscape");
  doc.addImage(
  logo,
  "PNG",
  20,
  15,
  35,
  35
);
  doc.rect(10, 10, 277, 190);
doc.rect(15, 15, 267, 180);

  doc.setFontSize(28);
  doc.text(
    "Certificate of Completion",
    148,
    40,
    { align: "center" }
  );
  doc.addImage(
  stamp,
  "PNG",
  220,
  115,
  40,
  40
);
doc.addImage(
  signature,
  "PNG",
  200,
  145,
  50,
  25
);

  doc.setFontSize(18);
  doc.text(
    "This certifies that",
    148,
    70,
    { align: "center" }
  );

  doc.setFontSize(24);
  doc.text(
    localStorage.getItem("name") ||
      "Candidate",
    148,
    90,
    { align: "center" }
  );

  doc.setFontSize(16);
  doc.text(
    "has successfully completed the AI Interview Simulator",
    148,
    110,
    { align: "center" }
  );

  doc.text(
    `Role: ${role}`,
    148,
    130,
    { align: "center" }
  );

  doc.text(
    `Score: ${score}/9`,
    148,
    145,
    { align: "center" }
  );
  doc.text(
  `Date: ${new Date().toLocaleDateString()}`,
  105,
  160,
  { align: "center" }
);
doc.setFontSize(14);

doc.setFontSize(16);

doc.text(
  "LogiTech Solutions",
  220,
  165
);

doc.setFontSize(12);

doc.text(
  "AI Interview Simulator Platform",
  205,
  173
);

doc.text(
  "Hritik Kumar Prajapati",
  210,
  182
);

doc.text(
  "CEO & Founder",
  220,
  188
);
  doc.save("Certificate.pdf");
};

  const downloadPDF = () => {
   
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "AI Interview Report",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Role: ${role}`,
      20,
      40
    );

    doc.text(
      `Difficulty: ${difficulty}`,
      20,
      50
    );

    doc.text(
      `Score: ${score}/9`,
      20,
      60
    );

    let y = 80;

    answers.forEach(
      (answer, index) => {
        doc.text(
          `Q${index + 1}: ${
            selectedQuestions[index]
              ?.question || ""
          }`,
          20,
          y
        );

        y += 10;

        doc.text(
          `Answer: ${answer}`,
          20,
          y
        );

        y += 20;

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      }
    );

    doc.save(
      "Interview_Report.pdf"
    );
  };

  return (
    <div className="container">
      <h1>
        Interview Completed
      </h1>

      <h2>
        Score: {score}/9
      </h2>

      <p>
        {score >= 7
          ? "Excellent Performance 🚀"
          : score >= 4
          ? "Good Job 👍"
          : "Keep Practicing 💪"}
      </p>

      <h2>🤖 AI Feedback</h2>

      {aiScore && (
        <h3>
          🎯 AI Score: {aiScore}/10
        </h3>
      )}

      <ul>
        {feedback.map(
          (item, index) => (
            <li key={index}>
              {item}
            </li>
          )
        )}
      </ul>

      <button
        onClick={generateAIFeedback}
      >
        🤖 Generate Gemini Feedback
      </button>

      <br />
      <br />

      {loading && (
        <p>
          Generating feedback...
        </p>
      )}

      {aiFeedback && (
        <div>
          <h3>
            Gemini Analysis
          </h3>

          <pre
            style={{
              whiteSpace:
                "pre-wrap",
              textAlign: "left",
            }}
          >
            {aiFeedback}
          </pre>
        </div>
      )}

      {aiAnswers.length > 0 && (
  <>
    <h2>🤖 AI Follow-up Answers</h2>

    {aiAnswers.map((item, index) => (
      <div key={index}>
        <p>
          <strong>AI Question:</strong>{" "}
          {item.question}
        </p>

        <p>
          <strong>Your Answer:</strong>{" "}
          {item.answer}
        </p>

        <hr />
      </div>
    ))}
  </>
)}
      <h2>Your Answers</h2>
      <h2>🤖 AI Follow-up Answers</h2>

{aiAnswers.length === 0 ? (

  <p>No AI follow-up answers found.</p>
) : (
  aiAnswers.map((item, index) => (
    <div key={index}>
      <p>
        <strong>AI Question:</strong>{" "}
        {item.question}
      </p>

  <p>
    <strong>Your AI Answer:</strong>{" "}
    {item.answer}
  </p>

  <hr />
</div>

))
)}


      {answers.map(
        (answer, index) => {
          let answerScore = 0;

          if (
            answer.length > 100
          ) {
            answerScore = 3;
          } else if (
            answer.length > 50
          ) {
            answerScore = 2;
          } else if (
            answer.length > 10
          ) {
            answerScore = 1;
          }

          return (
            <div key={index}>
              <h3>
                Question {index + 1}
              </h3>

              <p>
                <strong>
                  Question:
                </strong>{" "}
                {
                  selectedQuestions[
                    index
                  ]?.question
                }
              </p>

              <p>
                <strong>
                  Your Answer:
                </strong>{" "}
                {answer}
              </p>

              <p>
                <strong>
                  Rating:
                </strong>{" "}
                {"⭐".repeat(
                  answerScore
                )}
              </p>

              <hr />
            </div>
          );
        }
      )}

      <button
        onClick={downloadPDF}
      >
        Download PDF Report
      </button>

      <br />
      <br />
      <button onClick={downloadCertificate}>
        🏆 Download Certificate
      </button>

      <button
        onClick={() => {
          localStorage.removeItem(
            "answers"
          );
          localStorage.removeItem("aiAnswers");
          navigate("/");
        }}
      >
        Restart Interview
      </button>
    </div>
  );
}

export default Result;