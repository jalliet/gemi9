import React, { useState } from 'react';
import InfoCard from './InfoCard';
import groupLogo from "../groupLogoCircle.png"
import { Link } from 'react-router-dom';
import GEMI9Logo from "./GEMI9_logo.png";
import SpotlightLogo from "./Spotlight-AppLogo.png"

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
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
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setResponseText('');
    setUploadStatus('');
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }

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
    

  <body>
    
    <div id="imageUploadNavBar" className="max-w-2xl mx-auto mt-8 p-6 bg-#e6c090 rounded-lg shadow-lg">
      
      <div id="titleBox">
        <Link to="/home" ><img id="ourLogoImage" src={groupLogo} alt="" /></Link>
        <h2 id="pageTitle" ClassName="text-3xl font-bold mb-6 text-center text-gray-800"> Spotlight AI</h2>
      </div>
      <p>Shining the light on black innovation</p>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="mb-4 w-full p-2 border rounded"/>
      <button 
        onClick={handleUpload} 
        id="processButton"
        className="w-full mb-6 mr-10 bg-blue-500 text-black py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold "
        disabled={isLoading || !file}
      >
        {isLoading ? 'Processing...' : 'Upload and Analyze Image'}
      </button>
      {uploadStatus && (
        <div className={`p-4 rounded-lg mb-6 ${uploadStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {uploadStatus}
        </div>
      )}
      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Preview" id="uploadedImage" className=" rounded-lg" />
        </div>
      )}
      {responseText && (
         <InfoCard
            infoData={responseText}
        ></InfoCard>
      )}

      {/* <Link to="/" className="btn secondary-button">Back to Home</Link> */}
    </div>
    </body>
  );
};

export default ImageUpload;