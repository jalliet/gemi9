import React from 'react';
import { Link } from 'react-router-dom';
import GEMI9Logo from "./GEMI9_logo.png";
import userPhoto from "./pfp.png"
import SpotlightLogo from "./Spotlight-AppLogo.png"
import UserProfileCard from './UserProfileCard';

const Home = () => {
  return (
    <body>
      {/* ... (previous code remains the same) ... */}

      <UserProfileCard />

      <section className="home-buttons flex-column">
        {/* ... (rest of the code remains the same) ... */}
      </section>

      {/* ... (footer remains the same) ... */}
    </body>
  );
};

export default Home;
