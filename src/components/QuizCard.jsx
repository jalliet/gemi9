import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const QuizCard = ({ quizData, handleAnswerSelection, computeOptionStyle }) => {
  return (
    <Card className="card">
      <Card.Body>
        {/* Use dangerouslySetInnerHTML to inject raw HTML for the title */}
        <Card.Title 
          className="card-title"
          dangerouslySetInnerHTML={{ __html: quizData.title }} 
        />
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
