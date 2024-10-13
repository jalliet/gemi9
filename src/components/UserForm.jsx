import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import GEMI9Logo from "./GEMI9_logo.png";
import userPhoto from "./user-photo.png"

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

function UserForm() {	
	const [username, setUsername] = useState('');
	const [highScore, setHighScore] = useState(0);
	const [topStreak, setTopStreak] = useState(0);
  
	const handleSubmit = async (e) => {
		e.preventDefault();
	
		try {
		  	// Reference to the document with username as ID
		  	const userRef = doc(db, 'Users', username);
		
		  	// Set the document data
		  	await setDoc(userRef, {
				username: username,
				high_score: highScore,
				top_streak: topStreak
		  	}, { merge: true });  // This will update existing fields or add new ones

		  	console.log('User data updated successfully!');
		  	// Reset form or show success message
		} catch (error) {
		  	console.error('Error updating user data:', error);
	  		// Show error message to user
		}
	};

	return (
		
		<body>
			<header>
        <nav>
          <div className = "nav-div">
            <div className = "pic-title-div">
              <img className = "gemi9_logo" src = {GEMI9Logo} alt = "gemi9"/> 
              <div className = "title-div"> 
                <h1 className = "logo-name"> SPOTLIGHT</h1>
                <p> Shining a Light on Black Excellence </p> 
              </div>
            </div>

            <div className = "user-div">
              <img className = "user-photo" src = {userPhoto} alt = "user image"/>
            </div>
    
          </div>
  
        </nav>
      </header>
	  
		<div className = "user-info">
<img className = "user-photo-big" src = {userPhoto} alt = "user image"/>
			<form onSubmit={handleSubmit}>
				<input
					className = "user-details"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
					required
				/>
				{/* <input
					type="number"
					value={highScore}
					onChange={(e) => setHighScore(parseInt(e.target.value))}
					placeholder="High Score"
					required
				/> */}
				{/* <input
					type="number"
					value={topStreak}
					onChange={(e) => setTopStreak(parseInt(e.target.value))}
					placeholder="Top Streak"
					required
				/> */}
				<p> High Score:  </p>
				<p> Best Question Streak: </p>
				<button type="submit">Update User Data</button>
			</form>
		</div>

		<div class="footer"> 
     		<p>
     		 Created by GEMI9
     		</p>
    	</div>
		</body>
	);
}
  
export default UserForm;