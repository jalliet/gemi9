import React from 'react';
import { Link } from 'react-router-dom';
import GEMI9Logo from "./GEMI9_logo.png";
import userPhoto from "./user-photo.png"

const Home = () => {
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

        <div class="card">
          <div className ="container">
            <h4><b>Firstname Surname</b></h4>
          </div>
          <div className = "container">
            <p> High Score: 10 </p>
            <p> Streak:  7 days </p>
          </div>  
        </div>
    

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