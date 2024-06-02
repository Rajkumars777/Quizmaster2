import React from 'react';

const Results = ({ results, resetQuiz }) => {
  const correctAnswers = results.filter((result) => result.question.answer === result.answer).length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Quiz Results</h1>
      <p className="text-center text-lg mb-4">You answered {correctAnswers} out of {results.length} questions correctly.</p>
      <button
        onClick={resetQuiz}
        className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
      >
        Start New Quiz
      </button>
    </div>
  );
};

export default Results;
