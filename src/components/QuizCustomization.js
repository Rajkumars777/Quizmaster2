import React, { useState } from 'react';

const QuizCustomization = ({ onStartQuiz }) => {
  const [subject, setSubject] = useState('Mathematics');
  const [difficulty, setDifficulty] = useState('Easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const handleSubmit = () => {
    onStartQuiz({ subject, difficulty, numberOfQuestions });
  };

  return (
    <div className="quiz-customization bg-white p-8 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Customize your quiz:</h2>
      <label className="block mb-4">
        <span className="block text-gray-700">Subject:</span>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 block w-full">
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Literature">Literature</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">Difficulty level:</span>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 block w-full">
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </label>
      <label className="block mb-6">
        <span className="block text-gray-700">Number of questions:</span>
        <select value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(parseInt(e.target.value, 10))} className="mt-1 block w-full">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </label>
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
        Start Quiz
      </button>
    </div>
  );
};

export default QuizCustomization;
