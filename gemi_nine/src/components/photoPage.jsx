import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

    alert("Image uploaded successfully!");
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
    </div>
  );
};

export default PhotoPage;
