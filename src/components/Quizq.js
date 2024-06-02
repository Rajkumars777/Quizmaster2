import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quiz = ({ config }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async (retryCount = 0) => {
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: generateQuizPrompt(config.subject, config.difficulty, config.numberOfQuestions)
            }
          ],
          max_tokens: 150,
          n: 1,
        }, {
          headers: {
            'Authorization': `Bearer sk-proj-LcJqSoQuez4jYPBi8vT1T3BlbkFJC3KUv9Ek7SxltmgiNoA6`,
          },
        });

        const generatedQuestions = parseQuestions(response.data.choices[0].message.content);
        setQuestions(generatedQuestions);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429 && retryCount < 5) {
          // Wait for a short period before retrying
          setTimeout(() => fetchQuestions(retryCount + 1), (retryCount + 1) * 1000);
        } else {
          console.error('Error fetching questions:', error.response ? error.response.data : error.message);
        }
      }
    };

    fetchQuestions();
  }, [config]);

  const generateQuizPrompt = (subject, difficulty, numberOfQuestions) => {
    return `Generate ${numberOfQuestions} ${difficulty} difficulty quiz questions for ${subject}. Each question should have multiple choice answers and indicate the correct answer.`;
  };

  const parseQuestions = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const questions = [];
    let currentQuestion = { question: '', options: [], answer: '' };

    lines.forEach(line => {
      if (line.startsWith('Question:')) {
        if (currentQuestion.question) {
          questions.push(currentQuestion);
        }
        currentQuestion = { question: line.replace('Question:', '').trim(), options: [], answer: '' };
      } else if (line.startsWith('Option:')) {
        currentQuestion.options.push(line.replace('Option:', '').trim());
      } else if (line.startsWith('Answer:')) {
        currentQuestion.answer = line.replace('Answer:', '').trim();
      }
    });

    if (currentQuestion.question) {
      questions.push(currentQuestion);
    }

    return questions;
  };

  const handleAnswer = (selectedOption) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    setAnswers([...answers, { question: questions[currentQuestionIndex].question, selectedOption, correctAnswer }]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz Completed! Your score: ${score + 1}/${questions.length}`);
    }
  };

  if (isLoading) return <div className="text-center mt-8">Loading questions...</div>;

  return (
    <div className="quiz bg-white p-8 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">{config.subject} Quiz</h2>
      <div className="question mb-6">
        <p className="text-lg">{questions[currentQuestionIndex].question}</p>
        <div className="options mt-4">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 m-2">
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
