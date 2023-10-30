import { useState } from 'react';
import {Login} from './Login'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import kindleMathImg from '../assets/kindle_math.png'



export const HomePage = () =>{

    return(
        <>
          <h1> Welcome to Bookstore</h1>
          <div className="category-div">



      <div className="single-category">
      <Link to="/maths" className="category-link">
          <img src="https://m.media-amazon.com/images/I/81YTP05NuVL._SL1500_.jpg" alt="" className="category-img" />              
        Math Books</Link>
        </div>

        <div className="single-category">
      <Link to="/other_stems" className="category-link">
          <img src="https://m.media-amazon.com/images/I/51jhj5s4xkL.jpg" alt="" className="category-img" />              
        STEM</Link>
        </div>

        <div className="single-category">
      <Link to="/kindle_maths" className="category-link">
          <img src={kindleMathImg} alt="" className="category-img" />              
        Maths Kindle</Link>
        </div>

        <div className="single-category">
      <Link to="/kindle_stems" className="category-link">
          <img src="https://m.media-amazon.com/images/I/61mww2Wl3oL._AC_SL1500_.jpg" alt="" className="category-img" />              
          General</Link>
        </div>



          </div>
    
        </>

    )
}
/*


 <div className="single-category">
              <img src="https://m.media-amazon.com/images/I/81YTP05NuVL._SL1500_.jpg" alt="" className="category-img" />
              <Link to="/maths" className="category-link">Math Books</Link>
            </div>

            

*/