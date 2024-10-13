import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <body>
      
      <header>
        <nav>
          <h1> Spotlight</h1>
          <p> Shining a Light on Black Talent</p>
        </nav>
      </header>

    <section className="home-buttons flex-column">
      {/* Link to the quiz page */}
      <section> <center> <Link to="/quiz" className=" btn primary-button"> Start Quiz</Link> </center> </section>
      <section> <center> <Link to="/photo" className="btn primary-button">  Upload a Photo </Link> </center> </section>
    </section>
    
    </body>
  );
};

export default Home;