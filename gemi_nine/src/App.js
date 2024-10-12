// import logo from './logo.svg';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
// import QuizCard from './QuizCard';
import React, { useState, useEffect } from 'react';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom,'
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <div>
        {/* Define Routes for different pages */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />
          {/* Quiz page route */}
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
