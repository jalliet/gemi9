import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
  
	const handleSubmit = async (e) => {
		e.preventDefault();
	
		try {
		  	// Reference to the document with username as ID
		  	const userRef = doc(db, 'Users', username);
		
		  	// Set the document data
		  	await setDoc(userRef, {
				username: username,
		  	}, { merge: true });  // This will update existing fields or add new ones

		  	console.log('User data updated successfully!');
		  	// Reset form or show success message
		} catch (error) {
		  	console.error('Error updating user data:', error);
	  		// Show error message to user
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				required
			/>
			<p>High Score: </p>
			<p>Best Quiz Streak: </p>
			<button type="submit">Update User Data</button>
		</form>
	);
}
  
export default UserForm;