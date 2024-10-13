import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';


function InfoCard({ infoData, handleSelection }) {
  return (
    <div id="infoCardBox" className="bg-white shadow-md rounded-lg overflow-hidden">
      <Card>
        <Card.Header as="h5">Info</Card.Header>
        <Card.Body>
            {infoData.name && (<Card.Title>{infoData.name}</Card.Title>)}
            <Card.Text>
            {Object.entries(infoData).map(([key, value]) => (
                <p key={key}>
                <strong>{key}:</strong> {value}
                </p>
            ))}
            </Card.Text>
            
        </Card.Body>
        </Card>
    </div>
  );
}

export default InfoCard;