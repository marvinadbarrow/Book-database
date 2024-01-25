import { useState } from 'react';
import {Login} from './Login'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import kindleMathImg from '../assets/kindle_math.png'
import generalBookImg from '../assets/general_books.png'
import testBookshelfImg from '../assets/test_bookshelf.png'

console.log(kindleMathImg)

export const HomePage = () =>{




const [user, setUser] = useState('user')
const [admin, setAdmin] = useState('admin')
const [signedIn, setSignedIn] = useState('')
    return(
        <>

        {// show user dashboard info if user is signed in
        signedIn == 'user' &&
          <>
          <h3 className='sign-in-banner'>Welcome {user}, you're signed in</h3>
          </>}



          {// show admin dashboard info if admin is signed in
          signedIn == 'admin' &&
          <>
          <h3 className='sign-in-banner'>Welcome {admin}, you're signed in</h3>
          </>}


          {// show signed out info if neither user nor admin are signed in
          signedIn == '' &&
          <>
          <h3 className='sign-in-banner'> Login or signup</h3>
          </>}          


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
      <Link to="/generals" className="category-link">
          <img src={generalBookImg} alt="" className="category-img" />              
          General</Link>
        </div>

        <div className="single-category">
      <Link to="/test_books" className="category-link">
          <img src={testBookshelfImg} alt="" className="category-img" />              
          Test Books</Link>
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