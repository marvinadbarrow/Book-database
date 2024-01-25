import './App.css';
import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import './App.css'
import {HomePage} from './pages/HomePage'
import {About} from './pages/About'
import {Contact} from './pages/Contact'
import { Navbar } from './components/Navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import {BooksMath} from './pages/BooksMath'
import { GetUser } from './pages/GetUser';
import { UsersView } from './pages/UsersView';
import { Footer } from './components/footer';
import { AdminSignIn } from './pages/AdminSignIn';
import { BooksStem } from './pages/BooksStem';
import {KindleMath} from './pages/KindleMath'
import { GenericBooksPage } from './pages/GenericBooksPage';
let tempName = 'John'

console.log(<Footer tempName={tempName}/>)

function App() {
// in the below routes, to solve the issue of only one route per page, you could use the same route for several pages; for example for the math and other stem pages (non kindle) only a couple of elements differ, and only in the name displayed in the element text; so, the same page can be rendered, but, adding props in t he component relevant to the specific component reqired, then those props can be used in on the generic page to render the correct words. You could even switch the page name variable to determine which URL to use for the axios get method. 

  return (
    <>
 <Router>
<div className="content-div">


<Navbar/>

  <Switch>

<Route exact path='/'>
<HomePage/>
</Route>


<Route exact path='/about'>
<About/>
</Route>


<Route exact path='/contact'>
<Contact/>
</Route>


<Route exact path='/signup'>
<SignUp/>
</Route>


<Route exact path='/login'>
<Login/>
</Route>

<Route exact path='/users/:_id'>
<GetUser/>
</Route>

<Route exact path='/maths'>
<GenericBooksPage bookCategoryText={'Maths (physical)'} navigateToMainText={'Math Home'} bookType={'physical'} categoryName={'maths'}/>
</Route>

<Route exact path='/other_stems'>
<GenericBooksPage bookCategoryText={'Other STEM (physical)'} navigateToMainText={'STEM Home'} bookType={'physical'} categoryName={'stems'}/>
</Route>

<Route exact path='/kindle_maths'>
<GenericBooksPage bookCategoryText={'Maths (Kindle)'} navigateToMainText={'Kindle Math Home'} bookType={'digital'} categoryName={'kindle maths'}/>
</Route>

<Route exact path='/generals'>
<GenericBooksPage bookCategoryText={'General (physical)'} navigateToMainText={'General Books Home'} bookType={'physical'} categoryName={'general'}/>
</Route>

<Route exact path='/test_books'>
<GenericBooksPage bookCategoryText={'General (physical)'} navigateToMainText={'Test Books Home'} bookType={'physical'} categoryName={'test books'}/>
</Route>



<Route exact path='/users_all'>
<UsersView/>
</Route>

<Route exact path='/admins'>
<AdminSignIn/>
</Route>

  </Switch>
<Footer/>

</div>


 </Router>
    </>
  )
}

export default App

/*


  const [jokes, setJokes] = useState('')


     <div>
     <p className="joke-para">{jokes}</p>
      </div>
      <button className='test-btn' onClick={() =>{
        getApiBack()
      }}>Click this</button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

*/