import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to the Quiz App</h1>
      <p>Test your knowledge with our fun quizzes!</p>
      {/* Link to the quiz page */}
      <Link to="/quiz" className="btn btn-primary">Start Quiz</Link>
    </div>
  );
};

export default Home;
