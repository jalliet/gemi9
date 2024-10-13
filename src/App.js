import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React, { useState, useEffect } from 'react';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import QuizPage from './components/QuizPage';
import ImageUpload from './components/ImageUpload';
import UserProfileCard from './components/user-profile-card';
// import UserForm from "./components/UserForm";

const App = () => {
  return (
    <Router>
      <div>
        {/* Define Routes for different pages */}
        <Routes>
          {/* Home page route */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<UserProfileCard />} />
          {/* Quiz page route */}
          <Route path="/quiz" element={<QuizPage />} />
          {/* Photo page route */}
          <Route path="/photo" element={<ImageUpload />} />
          {/* User Form page route */}
          {/* <Route path="/profile" element={<UserForm />} /> */}
          <Route path="/home" element={<Home/>} />  
        </Routes>
      </div>
    </Router>
  );
};

export default App;
