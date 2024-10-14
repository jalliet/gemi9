import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const QuizCard = ({ quizData, handleAnswerSelection, computeOptionStyle }) => {
  return (
    <Card className="card">
      {/* Display the inventor's image at the top of the card */}
      <Card.Img variant="top" src={quizData.image} alt={quizData.name} />

      <Card.Body>
        <Card.Title className="card-title">{quizData.title}</Card.Title>
        <Card.Text className="card-text">{quizData.description}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        {quizData.options.map((option, index) => (
          <ListGroup.Item
            key={index}
            onClick={() => handleAnswerSelection(index)}
            className={computeOptionStyle(index).backgroundColor ? (index === quizData.correctAnswer ? 'green' : 'red') : ''}
            style={{ cursor: 'pointer', ...computeOptionStyle(index) }} // Apply the computed style here
          >
            {option}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default QuizCard;
