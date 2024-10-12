import React from 'react';

const QuizCard = ({ quizData, handleAnswerSelection }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={quizData.image} alt="Quiz" />
      <div className="card-body">
        <h5 className="card-title">{quizData.title}</h5>
        <p className="card-text">{quizData.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        {quizData.options.map((option, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => handleAnswerSelection(index)}
            style={{ cursor: 'pointer' }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizCard;
