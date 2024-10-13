import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import InfoCard from './InfoCard';
import { Link } from 'react-router-dom';
import GEMI9Logo from "./GEMI9_logo.png";
import SpotlightLogo from "./Spotlight-AppLogo.png"

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
  ];

// Example info data for InfoCard
const infoExample = {
  name: "Elijah McCoy", 
  nationality: "United States", 
  heritage: "African American", 
  contribution: "Train lubrication system", 
  bio: "Elijah McCoy was an African American inventor who became known for his work on oiling steam engines. His inventions, including the lubricating cup (which allowed locomotives to be lubricated while in motion), were widely used by railroads around the world.", 
  info_links: [ "https://en.wikipedia.org/wiki/Elijah_McCoy" ],
  image_link: [ "https://en.wikipedia.org/wiki/Elijah_McCoy/image" ]
};

  

const QuizPage = () => {
  const [quizData, setQuizData] = useState(practiceQuizData[0]);
  const [score, setScore] = useState(0);
  const [showInfo, setShowInfo] = useState(false); // State to control InfoCard visibility
  const [infoData, setInfoData] = useState(infoExample)
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

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

  // Function to handle switching to the next quiz question
  const toggleCard = () => {
    // // Fetch the next quiz question after answering
    // fetchQuizData();

    const nextQuestionIndex = currQuestionIndex + 1;
    if (nextQuestionIndex < practiceQuizData.length) {
        setCurrQuestionIndex(nextQuestionIndex);
        setQuizData(practiceQuizData[nextQuestionIndex]);
        setShowInfo(false); // Hide InfoCard when switching questions
    } else {
        alert('Quiz complete');
    }
  };

  // Function to handle answer selection and display InfoCard
  const handleAnswerSelection = (selectedOption) => {
    if (selectedOption === quizData.correctAnswer) {
      alert('Correct!');
      setScore(score + 1); // Increment score if correct
    } else {
      alert('Incorrect!');
    }
    setShowInfo(true); // Show InfoCard after answering
  };


  return (
    <body>
      
      <header>
      <nav>
        <div className = "nav-div">
          <div className = "pic-title-div">
          <Link to="/" >
            <img className = "gemi9_logo" src = {SpotlightLogo} alt = "gemi9"/> </Link>
            <div className = "title-div"> 
              <h1 className = "logo-name"> SPOTLIGHT</h1>
              <p> Shining a Light on Black Excellence </p> 
            </div>
          </div>

          <div className = "user-div"> 
          {/* CHANGE THIS TO USER PROFILE PAGE */}
          <Link to="/photo" className="user-button"> <img className = "user-photo" src = {GEMI9Logo} alt = "user image"/> </Link>
          </div>

        </div>

      </nav>
    </header>

      <div className="container">
        <header>
          <h1>Quiz Page</h1>
        </header>

        <QuizCard
          quizData={quizData}
          handleAnswerSelection={handleAnswerSelection}
        />

        {/* Conditionally render InfoCard after answering */}
        {showInfo && 
          (<InfoCard
              infoData={infoData}
              handleSelection={toggleCard}
          ></InfoCard>)}

        {/* Quiz Card displaying current question */}
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

       {/* <center> <Link to="/" className="btn secondary-button">Back to Home</Link> </center> */}
      </div>

        {/* <div class="footer"> 
      <p>
        Created by GEMI9
      </p>
      </div> */}
    </body>
    )
      }  

export default QuizPage;
