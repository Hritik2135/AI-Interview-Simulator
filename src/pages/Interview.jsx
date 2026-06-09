import React, { useState, useEffect, useRef } from "react";
import questions from "../data/questions";
import { useNavigate } from "react-router-dom";

function Interview() {
  const navigate = useNavigate();
  
  // User Data Setup
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const company =
  localStorage.getItem("company");
  const difficulty = localStorage.getItem("difficulty");
  const selectedQuestions =
  questions[company]?.[role]?.[difficulty] || [];

console.log("All Companies:", Object.keys(questions));
console.log("Company:", company);
console.log("Role:", role);
console.log("Difficulty:", difficulty);
console.log("Questions:", selectedQuestions);

   

  // State Management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(selectedQuestions.length).fill(""));
  const [answer, setAnswer] = useState("");
  
  // AI Q&A State
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [savedAIAnswers, setSavedAIAnswers] = useState([]);

  // Timer State
  const [timeLeft, setTimeLeft] = useState(30);

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // 1. Timer Logic
  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // 2. Camera Cleanup on Unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera Error:", error);
      alert("Camera access denied or not found.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript); // Updates text area
    };
    recognition.start();
  };

  const nextQuestion = () => {
    // Save current answer
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);

    // Reset current input
    setAnswer("");
    stopCamera(); // Stop camera before moving on

    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30); // Reset timer
      
      // Reset AI Question if any
      setAiQuestion("");
      setAiAnswer("");
    } else {
      // Finish Interview
      localStorage.setItem("answers", JSON.stringify(updatedAnswers));
      // Optionally save AI answers too if needed
      localStorage.setItem("aiAnswers", JSON.stringify(savedAIAnswers));
      navigate("/result");
    }
  };

  const generateFollowUpQuestion = async () => {
    if (!answer.trim()) {
      alert("Please write an answer first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/next-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, answer }),
      });

      const data = await response.json();
      if (data.question) {
        setAiQuestion(data.question);
      } else {
        alert("No AI follow-up question generated.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate AI question.");
    }
  };

  const saveAiAnswer = () => {
    const newEntry = { question: aiQuestion, answer: aiAnswer };
    const updated = [...savedAIAnswers, newEntry];
    setSavedAIAnswers(updated);
    
    // Clear AI inputs
    setAiAnswer("");
    setAiQuestion("");
    
    alert("AI Answer Saved Successfully");
  };

  // UI Rendering
  return (
    <div className="container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Interview Session</h1>
      
      <div style={{ marginBottom: "20px", padding: "10px", background: "#f5f5f5", borderRadius: "8px" }}>
        <p><strong>Candidate:</strong> {name}</p>
        <p><strong>Role:</strong> {role} | <strong>Difficulty:</strong> {difficulty}</p>
      </div>

      <h2 style={{ color: timeLeft < 10 ? "red" : "black" }}>
        ⏱️ Time Left: {timeLeft}s
      </h2>

      {/* Camera Section */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={startCamera} style={{ marginRight: "10px" }}>🎥 Start Camera</button>
        <button onClick={stopCamera}>🛑 Stop Camera</button>
        <br /><br />
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          width="300" 
          style={{ border: "2px solid #333", borderRadius: "10px", transform: "scaleX(-1)" }} 
        />
      </div>

      {/* Progress Bar */}
      <div className="progress-bar" style={{ height: "20px", width: "100%", background: "#ddd", borderRadius: "10px", marginBottom: "20px" }}>
        <div 
          className="progress-fill" 
          style={{ 
            height: "100%", 
            width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%`, 
            background: "#4caf50", 
            borderRadius: "10px",
            transition: "width 0.3s ease" 
          }} 
        />
      </div>

      {/* Main Question */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Question {currentQuestion + 1} of {selectedQuestions.length}</h3>
        <h2 style={{ fontSize: "1.2rem" }}>{selectedQuestions[currentQuestion]?.question}</h2>
        
        <textarea
          rows="6"
          cols="50"
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        <br /><br />
        <button onClick={startListening}>🎤 Speak Answer</button>
      </div>

      {/* AI Follow-up Section */}
      <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "30px", background: "#fafafa" }}>
        <button onClick={generateFollowUpQuestion} style={{ background: "#673ab7", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          🤖 Ask AI Follow-up
        </button>
        
        {aiQuestion && (
          <div style={{ marginTop: "20px" }}>
            <h4>AI Follow-up:</h4>
            <p><strong>Q:</strong> {aiQuestion}</p>
            <textarea
              rows="4"
              placeholder="Write answer for AI..."
              value={aiAnswer}
              onChange={(e) => setAiAnswer(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
            <br /><br />
            <button onClick={saveAiAnswer}>💾 Save AI Answer</button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <button 
        onClick={nextQuestion} 
        style={{ width: "100%", padding: "15px", background: "#2196f3", color: "white", border: "none", borderRadius: "5px", fontSize: "18px", cursor: "pointer" }}
      >
        {currentQuestion === selectedQuestions.length - 1 ? "Finish Interview" : "Next Question ➡️"}
      </button>
    </div>
  );
}

export default Interview;