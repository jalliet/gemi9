import React from 'react';
import { Link } from 'react-router-dom';
import GEMI9Logo from "./GEMI9_logo.png";

const Home = () => {
  return (
    <body>
      
      <header>
        <nav>
          <img className = "gemi9_logo" src = {GEMI9Logo} alt = "gemi9"/> 
          <div> 
          <h1 className = "logo-name"> SPOTLIGHT</h1>
          <p> Shining a Light on Black Talent</p> 
          </div>
  
        </nav>
      </header>

    <section className="home-buttons flex-column">
      {/* Link to the quiz page */}
      <section> <center> <Link to="/quiz" className=" btn primary-button"> Start Quiz</Link> </center> </section>
      <section> <center> <Link to="/photo" className="btn primary-button">  Upload a Photo </Link> </center> </section>
    </section>

   
     <div class="footer"> 
     <p>
      Created by GEMI9
     </p>
     </div>


    </body>
  );
};

export default Home;