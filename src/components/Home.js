import React, { useState } from 'react';

const Home = ({ startQuiz }) => {
  const [subject, setSubject] = useState('Mathematics');
  const [difficulty, setDifficulty] = useState('Easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    startQuiz({ subject, difficulty, numberOfQuestions });
  };

  return (
    
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to QuizMaster!</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Subject:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Literature">Literature</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-medium">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-medium">Number of Questions:</label>
          <select
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default Home;
