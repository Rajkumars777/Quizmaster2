import React from 'react';

const MainMenu = ({ onNext }) => {
  return (
    <div className="main-menu bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to QuizMaster!</h1>
      <p className="mb-6">Choose your subject to start learning:</p>
      <button onClick={onNext} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Start
      </button>
    </div>
  );
};

export default MainMenu;
