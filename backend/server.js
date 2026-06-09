import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
//auto questions
app.post("/next-question", async (req, res) => {
  try {
    const { role, answer } = req.body;

    const prompt = `
You are a professional technical interviewer.

Candidate Role:
${role}

Candidate Previous Answer:
${answer}

Ask ONLY ONE follow-up interview question.

Rules:
- Return only the question.
- Do not give explanation.
- Do not give answer.
- Keep it short.
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    const question =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Can you explain more about that?";

    res.json({
      question,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});


app.post("/feedback", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
Question:
${question}

Candidate Answer:
${answer}

Give interview feedback in this format:

Strengths:
- ...

Improvements:
- ...

Score: x/10
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    console.log("Gemini Response:");
    console.log(response);

    const feedback =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No feedback generated";

    res.json({
      feedback,
    });
  } catch (error) {
    console.error("FULL ERROR:");
    console.error(error);

    res.status(500).json({
  error:
    "Gemini quota exceeded. Please try again later.",
});
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});