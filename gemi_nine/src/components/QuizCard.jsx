import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const QuizCard = ({ quizData, handleAnswerSelection }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={quizData.image} alt="Quiz" />
      <Card.Body>
        <Card.Title>{quizData.title}</Card.Title>
        <Card.Text>{quizData.description}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        {quizData.options.map((option, index) => (
          <ListGroup.Item
            key={index}
            onClick={() => handleAnswerSelection(index)}
            style={{ cursor: 'pointer' }}
          >
            {option}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default QuizCard;
