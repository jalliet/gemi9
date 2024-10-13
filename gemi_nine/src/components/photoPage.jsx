// import React, { useState } from "react";
// import { Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import {Storage} from '@google-cloud/storage';

// const PhotoPage = () => {
//   const [imagePreview, setImagePreview] = useState(null); // State to store image preview
//   const [file, setFile] = useState(null); // State to store the selected file

//   // Function to handle file input change and display image preview
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFile(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Function to handle image upload (you can replace with actual upload logic)
//   const uploadImage = () => {
//     if (!file) {
//       alert("Please select an image first!");
//       return;
//     }

//     const {Storage} = require('@google-cloud/storage');
    
//     // For demo purposes, we just log the file object
//     console.log("Uploading file:", file);

//     const bucketName = 'gemi9_image_store';
//     const fileName = '${file.name}_${Date.now()}';
//     const generationMatchPrecondition = 0;

//     alert("Image uploaded successfully!");

//     const storage = new Storage({
//       projectId: 'zinc-conduit-438409-i7',
//       credentials: {
//         client_email: 'gemi9image@zinc-conduit-438409-i7.iam.gserviceaccount.com',
//         private_key: 'AIzaSyAgsrjXTuGhb5AcuJsFiyUfpp5SGfobgBI',
//       }
//     });
    
    

  
  
//     async function uploadFile() {
//       const options = {
//         destination: fileName,
//         // Optional:
//         // Set a generation-match precondition to avoid potential race conditions
//         // and data corruptions. The request to upload is aborted if the object's
//         // generation number does not match your precondition. For a destination
//         // object that does not yet exist, set the ifGenerationMatch precondition to 0
//         // If the destination object already exists in your bucket, set instead a
//         // generation-match precondition using its generation number.
//         preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
//       };
  
//       await storage.bucket(bucketName).upload('/' + fileName, options);
//       console.log(`${fileName} uploaded to ${bucketName}`);
//     }
  
//     uploadFile().catch(console.error);
     

//   return (
//     <div className="container">
//       {/* Image Upload Section */}
//       <div className="image-upload-container">
//         <h1>Take a Picture and Upload</h1>

//         {/* Input to capture a picture using the device camera */}
//         <input
//           type="file"
//           accept="image/*"
//           capture="environment"
//           onChange={handleFileChange}
//         />

//         {/* Preview area for the captured image */}
//         {imagePreview && (
//           <div>
//             <img
//               src={imagePreview}
//               alt="Image Preview"
//               style={{ width: "300px", marginTop: "20px" }}
//             />
//           </div>
//         )}

//         {/* Upload button */}
//         <button className="btn btn-primary mt-3" onClick={uploadImage}>
//           Upload Image
//         </button>
//       </div>

//       {/* Identification and Information Section */}
//       <div className="identification-container mt-5">
//         {/* Additional content can go here */}
//       </div>

//       <Link to="/" className="btn btn-secondary">Back to Home</Link>
//     </div>
//   );
// };
// }
// export default PhotoPage;
