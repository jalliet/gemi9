import React, { useState, useEffect } from 'react';

// Helper function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const fetchQuizData = async () => {
  const apiUrl = 'https://europe-west2-zinc-conduit-438409-i7.cloudfunctions.net/QuizFactAccess';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data; // API response containing inventors and their contributions
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const generateQuizQuestions = (inventorsData, numQuestions = 10) => {
  const questions = [];

  inventorsData = shuffleArray(inventorsData); // Shuffle the inventors data to randomize the selection

  // Iterate through the selected number of inventors
  for (let i = 0; i < Math.min(numQuestions, inventorsData.length); i++) {
    const inventor = inventorsData[i];

    // Get correct answer (contribution of the current inventor)
    const correctAnswer = inventor.contribution;

    // Get three random incorrect answers from other inventors
    const incorrectAnswers = inventorsData
      .filter((item) => item.contribution !== correctAnswer) // Exclude the correct answer
      .map((item) => item.contribution); // Extract only the contribution
    const randomIncorrectAnswers = shuffleArray(incorrectAnswers).slice(0, 3); // Get 3 random incorrect answers

    // Shuffle the correct and incorrect answers together
    const options = shuffleArray([correctAnswer, ...randomIncorrectAnswers]);

    // Get the index of the correct answer in the shuffled options
    const correctAnswerIndex = options.indexOf(correctAnswer);

    // Construct the question object
    questions.push({
      image: inventor.image_link ? inventor.image_link[0] : './public/assets/PH.png', // Placeholder image if no image is provided
      title: `What contribution did ${inventor.name} make in science?`,
      description: 'Select the correct answer from the options below.',
      options,
      correctAnswer: correctAnswerIndex, // Index of the correct answer
    });
  }

  return questions;
};

const QuizApp = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    // Fetch data and generate quiz questions on component mount
    const getQuizQuestions = async () => {
      const inventorsData = await fetchQuizData();
      const generatedQuestions = generateQuizQuestions(inventorsData);
      setQuizQuestions(generatedQuestions);
    };

    getQuizQuestions();
  }, []);

  return (
    <div>
      <h1>Science Contributions Quiz</h1>
      {quizQuestions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        quizQuestions.map((question, index) => (
          <div key={index} className="quiz-card">
            <img src={question.image} alt={`${question.title}`} />
            <h2>{question.title}</h2>
            <p>{question.description}</p>
            <ul>
              {question.options.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default QuizApp;
