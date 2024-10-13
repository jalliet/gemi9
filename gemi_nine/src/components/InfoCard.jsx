import React from 'react';

function InfoCard({ infoData, handleAnswerSelection }) {
  if (!infoData || typeof infoData !== 'object') {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h5 className="text-lg font-semibold">Info</h5>
        </div>
        <div className="p-4">
          <p className="text-red-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b">
        <h5 className="text-lg font-semibold">Info</h5>
      </div>
      <div className="p-4">
        {infoData.name && <h2 className="text-xl font-bold mb-2">{infoData.name}</h2>}
        <div className="space-y-2">
          {Object.entries(infoData).map(([key, value]) => (
            <p key={key}>
              <strong className="font-semibold">{key}:</strong> {String(value)}
            </p>
          ))}
        </div>
        <button 
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAnswerSelection}
        >
          Next Card
        </button>
      </div>
    </div>
  );
}

export default InfoCard;