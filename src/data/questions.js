const questions = {
  "Java Developer": {
    Easy: [
      { id: 1, question: "What is JVM?" },
      { id: 2, question: "What is OOP?" },
      { id: 3, question: "What is JDK?" }
    ],
    Medium: [
      { id: 1, question: "What is Inheritance?" },
      { id: 2, question: "What is Polymorphism?" },
      { id: 3, question: "Difference between JDK and JRE?" }
    ],
    Hard: [
      { id: 1, question: "Explain Garbage Collection in Java." },
      { id: 2, question: "What is JVM Memory Model?" },
      { id: 3, question: "Difference between HashMap and ConcurrentHashMap?" }
    ]
  },

  "Frontend Developer": {
    Easy: [
      { id: 1, question: "What is HTML?" },
      { id: 2, question: "What is CSS?" },
      { id: 3, question: "What is JavaScript?" }
    ],
    Medium: [
      { id: 1, question: "What is React?" },
      { id: 2, question: "What are React Hooks?" },
      { id: 3, question: "Difference between Props and State?" }
    ],
    Hard: [
      { id: 1, question: "What is Virtual DOM?" },
      { id: 2, question: "Explain React Lifecycle." },
      { id: 3, question: "How does React Reconciliation work?" }
    ]
  },

  "Backend Developer": {
    Easy: [
      { id: 1, question: "What is Node.js?" },
      { id: 2, question: "What is Express.js?" },
      { id: 3, question: "What is an API?" }
    ],
    Medium: [
      { id: 1, question: "What is REST API?" },
      { id: 2, question: "What is Middleware?" },
      { id: 3, question: "Difference between GET and POST?" }
    ],
    Hard: [
      { id: 1, question: "What is JWT Authentication?" },
      { id: 2, question: "Explain Event Loop in Node.js." },
      { id: 3, question: "Difference between SQL and NoSQL?" }
    ]
  }
};

export default questions;