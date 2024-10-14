import React from 'react';

function InfoCard({ infoData, handleSelection }) {
  return (
    <div id="infoCardBox" className="info-card">
      <div className="info-card-header">Info</div>
      <div className="info-card-body">
        {infoData.name && <h5 className="info-card-title">{infoData.name}</h5>}
        <div className="info-card-text">
          {Object.entries(infoData).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
        {handleSelection && (
          <button className="info-card-button" onClick={handleSelection}>
            Next Card
          </button>
        )}
      </div>
    </div>
  );
}

export default InfoCard;
