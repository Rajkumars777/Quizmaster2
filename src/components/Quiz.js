import React, { useState, useEffect } from 'react';

const sampleQuestions = {
  Mathematics: [
    {
      "question": "What is the square root of 81?",
      "options": ["8", "9", "10"],
      "answer": "9"
    },
    {
      "question": "What is 3 multiplied by 9?",
      "options": ["24", "25", "27"],
      "answer": "27"
    }
,    
    { question: "What is the square root of 64?", options: ["8", "6", "10"], answer: "8" },
    { question: "What is the value of pi (π) to two decimal places?", options: ["3.14", "3.12", "3.16"], answer: "3.14" },
    // Add more questions until there are 15 in total
  ],
  Science: [
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2"], answer: "H2O" },
    { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter"], answer: "Mars" },
    {
      "question": "What is the chemical symbol for oxygen?",
      "options": ["O", "O2", "O3"],
      "answer": "O"
    }
    ,
    {
      "question": "What is the boiling point of water in Celsius?",
      "options": ["0°C", "100°C", "50°C"],
      "answer": "100°C"
    }
,    {
  "question": "What is the largest organ in the human body?",
  "options": ["Heart", "Liver", "Skin"],
  "answer": "Skin"
}
,{
  "question": "What is the chemical symbol for gold?",
  "options": ["Au", "Ag", "G"],
  "answer": "Au"
}
,{
  "question": "Which planet is known as the Red Planet?",
  "options": ["Earth", "Mars", "Venus"],
  "answer": "Mars"
}
,{
  "question": "What is the smallest unit of matter?",
  "options": ["Atom", "Molecule", "Electron"],
  "answer": "Atom"
}
,{
  "question": "What is the process by which plants make their own food called?",
  "options": ["Photosynthesis", "Respiration", "Transpiration"],
  "answer": "Photosynthesis"
}
,{
  "question": "Which gas is most abundant in Earth's atmosphere?",
  "options": ["Oxygen", "Nitrogen", "Carbon dioxide"],
  "answer": "Nitrogen"
}
,
    { question: "What is the atomic number of carbon?", options: ["6", "12", "14"], answer: "6" },
    { question: "What is the largest organ in the human body?", options: ["Skin", "Liver", "Brain"], answer: "Skin" },
    // Add more questions until there are 15 in total
  ],
  History: [
    { question: "Who was the first President of the United States?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"], answer: "George Washington" },
    { question: "What year did World War II end?", options: ["1945", "1939", "1918"], answer: "1945" },
    // Add more questions here...
    { question: "Who was the first emperor of Rome?", options: ["Julius Caesar", "Augustus", "Nero"], answer: "Augustus" },
    { question: "In what year did the American Civil War end?", options: ["1865", "1876", "1855"], answer: "1865" },
    // Add more questions until there are 15 in total
  ],
  Literature: [
    { question: "Who wrote 'Hamlet'?", options: ["William Shakespeare", "Charles Dickens", "Jane Austen"], answer: "William Shakespeare" },
    { question: "What is the title of the first Harry Potter book?", options: ["The Philosopher's Stone", "The Chamber of Secrets", "The Prisoner of Azkaban"], answer: "The Philosopher's Stone" },
    // Add more questions here...
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "F. Scott Fitzgerald"], answer: "Harper Lee" },
    { question: "Which novel begins with the line, 'It was the best of times, it was the worst of times'?", options: ["A Tale of Two Cities", "Great Expectations", "Pride and Prejudice"], answer: "A Tale of Two Cities" },
    // Add more questions until there are 15 in total
  ],
};

const Quiz = ({ finishQuiz }) => {
  const [settings, setSettings] = useState({
    subject: null,
    numberOfQuestions: 5,
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSubjectSelection = (subject) => {
    setSettings({ ...settings, subject });
  };

  const handleStartQuiz = () => {
    const selectedQuestions = sampleQuestions[settings.subject].slice(0, settings.numberOfQuestions);
    setQuestions(selectedQuestions);
  };

  const handleAnswer = (answer) => {
    setAnswers([...answers, { question: questions[currentQuestionIndex], answer }]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(answers);
    }
  };

  if (!settings.subject) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Welcome to QuizMaster! Choose your subject to start learning:</h2>
        <ul>
          {Object.keys(sampleQuestions).map((subject, index) => (
            <li key={index} onClick={() => handleSubjectSelection(subject)} className="cursor-pointer hover:underline mb-2">
              {subject}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Customize your quiz:</h2>
        <label className="block mb-4">
          Number of questions:
          <select
            value={settings.numberOfQuestions}
            onChange={(e) => setSettings({ ...settings, numberOfQuestions: parseInt(e.target.value) })}
            className="ml-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
        <button onClick={handleStartQuiz} className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
          Start Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          className="w-full py-2 px-4 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
