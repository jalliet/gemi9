import React, { useState } from 'react';
import InfoCard from './InfoCard';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  var apiResponse = {
    name: "", 
    nationality: "", 
    heritage: "", 
    contribution: "", 
    bio: "", 
    info_links: [],
    image_link: []
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setResponseText('');
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setUploadStatus('');
    setResponseText('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];

      try {
        const response = await fetch('https://europe-west2-zinc-conduit-438409-i7.cloudfunctions.net/ui-bridge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ file: base64Data }),
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }
        console.log(response.responseText);
        const text = await response.text();
        console.log(text);
        const texttoObj = JSON.parse(text);
        console.log(apiResponse);
        setResponseText(JSON.parse(text));
        setUploadStatus('Image processed successfully.');
      } catch (error) {
        console.error('Error:', error);
        setUploadStatus(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Image Upload and Analysis</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="mb-4 w-full p-2 border rounded"
      />
      <button 
        onClick={handleUpload} 
        className="w-full mb-6 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
        disabled={isLoading || !file}
      >
        {isLoading ? 'Processing...' : 'Upload and Analyze Image'}
      </button>
      {uploadStatus && (
        <div className={`p-4 rounded-lg mb-6 ${uploadStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {uploadStatus}
        </div>
      )}
      {responseText && (
         <InfoCard
            infoData={responseText}
            handleSelection={handleUpload}
        ></InfoCard>
      )}
    </div>
  );
};

export default ImageUpload;