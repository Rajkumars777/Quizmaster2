import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const startQuiz = (settings) => {
    setQuizSettings(settings);
  };

  const finishQuiz = (results) => {
    setQuizResults(results);
  };

  const resetQuiz = () => {
    setQuizSettings(null);
    setQuizResults(null);
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className='text-9xl text-bold'>QUIZMASTER&#129300;</h1>
      {!quizSettings && !quizResults && <Home startQuiz={startQuiz} />}
      {quizSettings && !quizResults && <Quiz settings={quizSettings} finishQuiz={finishQuiz} />}
      {quizResults && <Results results={quizResults} resetQuiz={resetQuiz} />}
    </div>
  );
}

export default App;
