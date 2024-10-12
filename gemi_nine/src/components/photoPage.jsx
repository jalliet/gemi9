import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {Storage} from '@google-cloud/storage';

const PhotoPage = () => {
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const [file, setFile] = useState(null); // State to store the selected file

  // Function to handle file input change and display image preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle image upload (you can replace with actual upload logic)
  const uploadImage = () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }
    
    // For demo purposes, we just log the file object
    console.log("Uploading file:", file);

    const bucketName = 'gemi9_image_store'
    const fileName = '${file.name}_${Date.now()}'

    alert("Image uploaded successfully!");

    const storage = new Storage({
      projectId: process.env.REACT_APP_GCS_PROJECT_ID,
      credentials: {
        client_email: process.env.REACT_APP_GCS_CLIENT_EMAIL,
        private_key: process.env.REACT_APP_GCS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }
    });
    
    function ImageUploader() {
      const [file, setFile] = useState(null);
    
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    
      const uploadFile = async () => {
        if (!file) {
          console.error('No file selected');
          return;
        }
    
        const bucketName = process.env.REACT_APP_GCS_BUCKET_NAME;
        const fileName = `images/${Date.now()}_${file.name}`;
    
        try {
          const bucket = storage.bucket(bucketName);
          const blob = bucket.file(fileName);
          
          const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.type
          });
    
          blobStream.on('error', (err) => {
            console.error('Error uploading file:', err);
          });
    
          blobStream.on('finish', () => {
            console.log('File uploaded successfully');
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
            console.log('Public URL:', publicUrl);
          });
    
          const buffer = await file.arrayBuffer();
          blobStream.end(Buffer.from(buffer));
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      return (
        <div>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button onClick={uploadFile}>Upload</button>
        </div>
      );
    }
    
    export default ImageUploader;
  };

  return (
    <div className="container">
      {/* Image Upload Section */}
      <div className="image-upload-container">
        <h1>Take a Picture and Upload</h1>

        {/* Input to capture a picture using the device camera */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />

        {/* Preview area for the captured image */}
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Image Preview"
              style={{ width: "300px", marginTop: "20px" }}
            />
          </div>
        )}

        {/* Upload button */}
        <button className="btn btn-primary mt-3" onClick={uploadImage}>
          Upload Image
        </button>
      </div>

      {/* Identification and Information Section */}
      <div className="identification-container mt-5">
        {/* Additional content can go here */}
      </div>

      <Link to="/" className="btn btn-secondary">Back to Home</Link>
    </div>
  );
};

export default PhotoPage;
