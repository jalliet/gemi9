import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import { Link } from 'react-router-dom';

const QuizPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = () => {
    // Fetch data from the quiz API (replace the URL with the actual API)
    fetch('https://api.example.com/quiz')
      .then(response => response.json())
      .then(data => setQuizData(data))
      .catch(error => console.error('Error fetching quiz data:', error));
  };

  const handleAnswerSelection = (selectedOption) => {
    if (selectedOption === quizData.correctAnswer) {
      alert('Correct!');
      setScore(score + 1);
    } else {
      alert('Incorrect!');
    }
    // Fetch the next quiz question after answering
    fetchQuizData();
  };

  return (
    <div className="container">
      <header>
        <h1>Quiz Page</h1>
      </header>

      {quizData ? (
        <QuizCard
          quizData={quizData}
          handleAnswerSelection={handleAnswerSelection}
        />
      ) : (
        <p>Loading quiz...</p>
      )}

      <footer>
        <p>Score: <span>{score}</span></p>
      </footer>

      <Link to="/" className="btn btn-secondary">Back to Home</Link>
    </div>
  );
};

export default QuizPage;
