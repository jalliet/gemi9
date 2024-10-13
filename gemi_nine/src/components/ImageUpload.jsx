import React, { useState } from 'react';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Replace with your actual upload URL
      const response = await fetch('https://europe-west2-zinc-conduit-438409-i7.cloudfunctions.net/ui-bridge', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Upload Image to Cloud Storage</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="w-full mb-4">Upload Image</button>
      {uploadStatus && (
        <alert variant={uploadStatus.includes('successfully') ? 'default' : 'destructive'}>
          <alertDescription>{uploadStatus}</alertDescription>
        </alert>
      )}
    </div>
  );
};

export default ImageUpload;