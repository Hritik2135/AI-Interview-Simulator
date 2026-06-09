const questions = {
  Google: {
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
        { id: 1, question: "Explain Garbage Collection." },
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
        { id: 2, question: "What are Hooks?" },
        { id: 3, question: "Difference between Props and State?" }
      ],
      Hard: [
        { id: 1, question: "What is Virtual DOM?" },
        { id: 2, question: "Explain React Lifecycle." },
        { id: 3, question: "How React Reconciliation Works?" }
      ]
    },

    "Backend Developer": {
      Easy: [
        { id: 1, question: "What is Node.js?" },
        { id: 2, question: "What is Express.js?" },
        { id: 3, question: "What is API?" }
      ],
      Medium: [
        { id: 1, question: "What is REST API?" },
        { id: 2, question: "What is Middleware?" },
        { id: 3, question: "Difference between GET and POST?" }
      ],
      Hard: [
        { id: 1, question: "Explain Event Loop." },
        { id: 2, question: "What is JWT?" },
        { id: 3, question: "Difference between SQL and NoSQL?" }
      ]
    }
  },

  Amazon: {
    "Java Developer": {
      Easy: [
        { id: 1, question: "What is Array?" },
        { id: 2, question: "What is Linked List?" },
        { id: 3, question: "What is Encapsulation?" }
      ],
      Medium: [
        { id: 1, question: "Explain HashMap." },
        { id: 2, question: "What is Recursion?" },
        { id: 3, question: "Difference between Stack and Queue?" }
      ],
      Hard: [
        { id: 1, question: "Design Amazon Cart System." },
        { id: 2, question: "Explain Microservices." },
        { id: 3, question: "How would you design Amazon Prime?" }
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
        { id: 2, question: "What is Redux?" },
        { id: 3, question: "Difference between State and Props?" }
      ],
      Hard: [
        { id: 1, question: "Explain Virtual DOM." },
        { id: 2, question: "Explain React Optimization." },
        { id: 3, question: "What is Lazy Loading?" }
      ]
    },

    "Backend Developer": {
      Easy: [
        { id: 1, question: "What is Node.js?" },
        { id: 2, question: "What is Express?" },
        { id: 3, question: "What is REST API?" }
      ],
      Medium: [
        { id: 1, question: "Explain Middleware." },
        { id: 2, question: "What is JWT?" },
        { id: 3, question: "What is Authentication?" }
      ],
      Hard: [
        { id: 1, question: "Design URL Shortener." },
        { id: 2, question: "Explain Load Balancing." },
        { id: 3, question: "What is Database Sharding?" }
      ]
    }
  },

  Microsoft: {
    "Java Developer": {
      Easy: [
        { id: 1, question: "What is Class?" },
        { id: 2, question: "What is Object?" },
        { id: 3, question: "What is Abstraction?" }
      ],
      Medium: [
        { id: 1, question: "Explain Interface." },
        { id: 2, question: "What is Dependency Injection?" },
        { id: 3, question: "Difference between Interface and Abstract Class?" }
      ],
      Hard: [
        { id: 1, question: "Explain Multithreading." },
        { id: 2, question: "Design Microsoft Teams." },
        { id: 3, question: "How would you design OneDrive?" }
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
        { id: 2, question: "What are Hooks?" },
        { id: 3, question: "What is Context API?" }
      ],
      Hard: [
        { id: 1, question: "Explain React Fiber." },
        { id: 2, question: "What is SSR?" },
        { id: 3, question: "Difference between CSR and SSR?" }
      ]
    },

    "Backend Developer": {
      Easy: [
        { id: 1, question: "What is API?" },
        { id: 2, question: "What is Node.js?" },
        { id: 3, question: "What is Express?" }
      ],
      Medium: [
        { id: 1, question: "Explain JWT." },
        { id: 2, question: "Explain Middleware." },
        { id: 3, question: "What is Authentication?" }
      ],
      Hard: [
        { id: 1, question: "Explain Event Loop." },
        { id: 2, question: "Design Notification Service." },
        { id: 3, question: "Explain Microservices." }
      ]
    }
  },
TCS: {
  "Java Developer": {
    Easy: [
      { id: 1, question: "What is DBMS?" },
      { id: 2, question: "What is SDLC?" },
      { id: 3, question: "What is C Programming?" }
    ],
    Medium: [
      { id: 1, question: "Explain Normalization." },
      { id: 2, question: "What is Operating System?" },
      { id: 3, question: "Difference between C and C++?" }
    ],
    Hard: [
      { id: 1, question: "Explain Software Testing." },
      { id: 2, question: "What is Cloud Computing?" },
      { id: 3, question: "Difference between Process and Thread?" }
    ]
  },

  "Frontend Developer": {
    Easy: [
      { id: 1, question: "What is HTML?" },
      { id: 2, question: "What is CSS?" },
      { id: 3, question: "What is JavaScript?" }
    ],
    Medium: [
      { id: 1, question: "What is Bootstrap?" },
      { id: 2, question: "What is React?" },
      { id: 3, question: "What is Responsive Design?" }
    ],
    Hard: [
      { id: 1, question: "Explain Virtual DOM." },
      { id: 2, question: "What is Redux?" },
      { id: 3, question: "Explain React Lifecycle." }
    ]
  },

  "Backend Developer": {
    Easy: [
      { id: 1, question: "What is Node.js?" },
      { id: 2, question: "What is API?" },
      { id: 3, question: "What is Express?" }
    ],
    Medium: [
      { id: 1, question: "What is JWT?" },
      { id: 2, question: "What is Middleware?" },
      { id: 3, question: "What is REST API?" }
    ],
    Hard: [
      { id: 1, question: "Explain Event Loop." },
      { id: 2, question: "What is Microservices?" },
      { id: 3, question: "Difference between SQL and NoSQL?" }
    ]
  }
},
Infosys: {
  "Java Developer": {
    Easy: [
      { id: 1, question: "What is Computer Network?" },
      { id: 2, question: "What is RAM?" },
      { id: 3, question: "What is Compiler?" }
    ],
    Medium: [
      { id: 1, question: "Explain OOP Concepts." },
      { id: 2, question: "What is TCP/IP?" },
      { id: 3, question: "What is SQL?" }
    ],
    Hard: [
      { id: 1, question: "Explain ACID Properties." },
      { id: 2, question: "What is Data Structure?" },
      { id: 3, question: "Difference between SQL and PL/SQL?" }
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
      { id: 2, question: "What is Bootstrap?" },
      { id: 3, question: "What is Responsive Design?" }
    ],
    Hard: [
      { id: 1, question: "Explain Virtual DOM." },
      { id: 2, question: "What is Redux?" },
      { id: 3, question: "Explain React Lifecycle." }
    ]
  },

  "Backend Developer": {
    Easy: [
      { id: 1, question: "What is Node.js?" },
      { id: 2, question: "What is Express.js?" },
      { id: 3, question: "What is API?" }
    ],
    Medium: [
      { id: 1, question: "What is JWT?" },
      { id: 2, question: "What is Middleware?" },
      { id: 3, question: "What is REST API?" }
    ],
    Hard: [
      { id: 1, question: "Explain Event Loop." },
      { id: 2, question: "What is Authentication?" },
      { id: 3, question: "Difference between SQL and NoSQL?" }
    ]
  }
},
Wipro: {
  "Java Developer": {
    Easy: [
      { id: 1, question: "What is Software?" },
      { id: 2, question: "What is Hardware?" },
      { id: 3, question: "What is Internet?" }
    ],
    Medium: [
      { id: 1, question: "Explain OSI Model." },
      { id: 2, question: "What is Database?" },
      { id: 3, question: "What is Java Collection Framework?" }
    ],
    Hard: [
      { id: 1, question: "Explain JVM Architecture." },
      { id: 2, question: "What is Cyber Security?" },
      { id: 3, question: "Difference between Authentication and Authorization?" }
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
      { id: 2, question: "What is Bootstrap?" },
      { id: 3, question: "What is DOM?" }
    ],
    Hard: [
      { id: 1, question: "Explain Virtual DOM." },
      { id: 2, question: "What is React Hooks?" },
      { id: 3, question: "Explain State Management." }
    ]
  },

  "Backend Developer": {
    Easy: [
      { id: 1, question: "What is Node.js?" },
      { id: 2, question: "What is Express.js?" },
      { id: 3, question: "What is API?" }
    ],
    Medium: [
      { id: 1, question: "What is REST API?" },
      { id: 2, question: "What is Middleware?" },
      { id: 3, question: "What is JWT?" }
    ],
    Hard: [
      { id: 1, question: "Explain Event Loop." },
      { id: 2, question: "What is Microservices?" },
      { id: 3, question: "Difference between SQL and NoSQL?" }
    ]
  }
}
};

export default questions;