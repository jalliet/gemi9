import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to our app </h1>
      <p>Test your knowledge with our fun quizzes!</p>
      {/* Link to the quiz page */}
      <div className = "flex-column justify-content-center">
      <Link to="/quiz" className="btn btn-primary"> Start Quiz</Link>
      <Link to="/photo" className="btn btn-primary">  Upload a Photo </Link>
      </div>
    </div>
  );
};

export default Home;
