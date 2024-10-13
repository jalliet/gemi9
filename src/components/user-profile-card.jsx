import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SpotlightLogo from "./Spotlight-AppLogo.png"
import GEMI9Logo from "./GEMI9_logo.png";
// import './UserProfileCard.css'; // We'll create this CSS file next

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyCNQn9daBj7P7XPSS-0PEFZk82M_GsjRRQ",
    authDomain: "gemi9-spotlight.firebaseapp.com",
    databaseURL: "https://gemi9-spotlight-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gemi9-spotlight",
    storageBucket: "gemi9-spotlight.appspot.com",
    messagingSenderId: "127274112992",
    appId: "1:127274112992:web:3b8a934a2c5fc0426d3d85",
    measurementId: "G-KLDEDJ51VN"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function UserProfileCard() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reference to the document with username as ID
      const userRef = doc(db, 'Users', username);

      // Set the document data
      await setDoc(userRef, {
        username: username,
        firstname: firstname,
        lastname: lastname
      }, { merge: true });

      console.log('User data updated successfully!');
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error updating user data:', error);
      // Show error message to user
      alert('Error updating user data. Please try again.');
    }
  };

  return (
    <body>
    <header>
			<nav>
			<div className = "nav-div">
				<div className = "pic-title-div">
				<Link to="/home" >
				<img className = "gemi9_logo" src = {SpotlightLogo} alt = "gemi9"/> </Link>
				<div className = "title-div"> 
					<h1 className = "logo-name"> SPOTLIGHT</h1>
					<p> Shining a Light on Black Excellence </p> 
				</div>
				</div>
				<div className = "user-div"> 
				<Link to="/" className="user-button"> <img className = "user-photo" src = {GEMI9Logo} alt = "user image"/> </Link>
				</div>
			</div>
			</nav>
      </header>
    
    <center>
    <div className="card-container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
            required
          />
          <button type="submit">Update User Data</button>
        </form>
      </div>
    </div>
    </center>
  </body>

  );
}

export default UserProfileCard;
