import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import { Link } from 'react-router-dom';

const practiceQuizData = [
    {
      id: 1,
      image: './public/assets/PH.png', // Example placeholder image
      title: 'What is the capital of France?',
      description: 'Select the correct answer from the options below.',
      options: ['Paris', 'London', 'Rome', 'Berlin'],
      correctAnswer: 0, // Index of the correct answer ('Paris')
    },
    {
      id: 2,
      image: './public/assets/PH.png', // Example placeholder image
      title: 'Which planet is known as the Red Planet?',
      description: 'Select the correct answer from the options below.',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 1, // Index of the correct answer ('Mars')
    },
    // Add more quiz questions as needed
  ];
  

const QuizPage = () => {
  const [quizData, setQuizData] = useState(practiceQuizData[0]);
  const [score, setScore] = useState(0);

    //code to allow demoing
    const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

    console.log(currQuestionIndex);

//   useEffect(() => {
//     fetchQuizData();
//   }, []);

//   const fetchQuizData = () => {
//     // Fetch data from the quiz API
//     fetch('https://api.example.com/quiz')
//       .then(response => response.json())
//       .then(data => setQuizData(data))
//       .catch(error => console.error('Error fetching quiz data:', error));
//   };

  const handleAnswerSelection = (selectedOption) => {
    if (selectedOption === quizData.correctAnswer) {
      alert('Correct!');
      setScore(score + 1);
    } else {
      alert('Incorrect!');
    }
    // // Fetch the next quiz question after answering
    // fetchQuizData();

    const nextQuestionIndex = currQuestionIndex + 1;
    if (nextQuestionIndex < practiceQuizData.length){
        setCurrQuestionIndex(nextQuestionIndex);
        setQuizData(practiceQuizData[nextQuestionIndex]);
    } else {
        alert('Quiz complete')
    }


  };

  return (
    <div className="container">
      <header>
        <h1>Quiz Page</h1>
      </header>

      <QuizCard
        quizData={quizData}
        handleAnswerSelection={handleAnswerSelection}
      />

      {/* {quizData ? (
        <QuizCard
          quizData={quizData}
          handleAnswerSelection={handleAnswerSelection}
        />
      ) : (
        <p>Loading quiz...</p>
      )} */}

      <footer>
        <p>Score: <span>{score}</span></p>
      </footer>

      <Link to="/" className="btn btn-secondary">Back to Home</Link>
    </div>
  );
};

export default QuizPage;
