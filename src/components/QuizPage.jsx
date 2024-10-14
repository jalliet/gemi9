import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import InfoCard from './InfoCard';
import { Link } from 'react-router-dom';
import GEMI9Logo from "./GEMI9_logo.png";
import SpotlightLogo from "./Spotlight-AppLogo.png";

import inventorsData from './inventors-data-json.json';

import phImage from './PH.png'
import './QuizPage.css';


// Helper function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateQuizQuestions = (inventorsData, numQuestions = 10) => {
  // This is the function that generates the quiz questions 
  const questions = [];

  inventorsData = shuffleArray(inventorsData); // Shuffle the inventors data to randomize the selection
  
  // Ensure we don't ask for more questions than available inventors
  const totalQuestions = Math.min(numQuestions, inventorsData.length);

  console.log('Fetched inventors data:', inventorsData);
  console.log(numQuestions, inventorsData.length)
  
  // Iterate through the selected number of inventors
  for (let i = 0; i < totalQuestions; i++) {
    const inventor = inventorsData[i];

    // Get correct answer (contribution of the current inventor)
    const correctAnswer = inventor.contribution;

    // Get three random incorrect answers from other inventors
    const incorrectAnswers = inventorsData
      .filter((item) => item.name !== inventor.name) // Exclude the correct answer
      .map((item) => item.contribution); // Extract only the contribution
    const randomIncorrectAnswers = shuffleArray(incorrectAnswers).slice(0, 3); // Get 3 random incorrect answers

    // Shuffle the correct and incorrect answers together
    const options = shuffleArray([correctAnswer, ...randomIncorrectAnswers]);

    // Get the index of the correct answer in the shuffled options
    const correctAnswerIndex = options.indexOf(correctAnswer);

    // Construct the question object
    questions.push({
      name : inventor.name,
      image: inventor.image_link, // Placeholder image if no image is provided
      title: `What contribution did ${inventor.name} make in science?`,
      description: 'Select the correct answer from the options below.',
      options,
      correctAnswer: correctAnswerIndex, // Index of the correct answer
    });
  }
  return questions;
};

//Example info data for InfoCard
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
  const [quizData, setQuizData] = useState([]);
  const [infoData, setInfoData] = useState(infoExample);


  const [score, setScore] = useState(0);
  const [showInfo, setShowInfo] = useState(false); // State to control InfoCard visibility

  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null); // Tracks the selected answer
  const [isAnswered, setIsAnswered] = useState(false); // Tracks if the question has been answered

  useEffect(() => {
    // Fetch data and generate quiz questions on component mount
    const getQuizQuestions = async () => {
      //const inventorsData = await fetchQuizData();
      // console.log('Fetched inventors data:', inventorsData);

      const generatedQuestions = generateQuizQuestions(inventorsData);
      console.log('Generated quiz questions:', generatedQuestions);

      setQuizData(generatedQuestions);
    };

    getQuizQuestions();
    console.log(quizData)
  }, []);

  // Function to handle switching to the next quiz question
  const toggleCard = () => {
    const nextQuestionIndex = currQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrQuestionIndex(nextQuestionIndex);
      setShowInfo(false);
      setSelectedAnswer(null); // Reset selected answer for new question
      setIsAnswered(false); // Reset answer state
    } else {
        alert('Quiz complete');
    }
  };

  // Function to handle answer selection and display InfoCard
  const handleAnswerSelection = (selectedIndex) => {
    setSelectedAnswer(selectedIndex); // Set the selected answer
    setIsAnswered(true); // Mark the question as answered

    if (selectedIndex === quizData[currQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const inventorName = quizData[currQuestionIndex].name; // Get the current inventor's name
    const inventorInfo = inventorsData.find((inventor) => inventor.name === inventorName); // Find the inventor object
    console.log('Inventor information: ', inventorInfo);

    setInfoData(inventorInfo); // Set the found inventor info to the state


    // Show the InfoCard after answering
    setShowInfo(true); // Show InfoCard after answering
  };

  // Compute the background color logic for the current question
  const computeOptionStyle = (index) => {
    if (!isAnswered) return {};

    if (index === quizData[currQuestionIndex].correctAnswer) {
      return { backgroundColor: 'green', color: 'white' };
    }

    if (index === selectedAnswer) {
      return { backgroundColor: 'red', color: 'white' };
    }

    return {};
  };

  return (
    <>
      
      <header>
      <nav>
        <div className = "nav-div">
          <div className = "pic-title-div">
          <Link to="/home" >
            <img className = "gemi9_logo" src = {SpotlightLogo} alt = "gemi9"/> </Link>
            <div className = "title-div"> 
              <h1 className = "logo-name"> SPOTLIGHT</h1>
              <p> Shining a Light on Black Excellence </p> 
            </div>
          </div>

          <div className = "user-div"> 
          {/* CHANGE THIS TO USER PROFILE PAGE */}
          <Link to="/" className="user-button"> <img className = "user-photo" src = {GEMI9Logo} alt = "user image"/> </Link>
          </div>

        </div>

      </nav>
    </header>

    <div className="container">
      <header>
        <h1>Quiz Page</h1>
      </header>

      {/* Conditionally render InfoCard after answering */}
      {showInfo && 
        (<InfoCard
            infoData={infoData}
            handleSelection={toggleCard}
        ></InfoCard>)}

      {/* Quiz Card displaying current question */}
      {quizData.length !== 0 ? (
        <QuizCard
          quizData={quizData[currQuestionIndex]}
          handleAnswerSelection={handleAnswerSelection}
          computeOptionStyle={computeOptionStyle} // Pass down the style function
        />
      ) : (
        <p>Loading quiz...</p>
      )}

      <footer>
        <p>Score: <span>{score}</span></p>
      </footer>

      {/* <Link to="/" className="btn btn-secondary">Back to Home</Link> */}
    </div>
    </>
    )
      }  

export default QuizPage;
