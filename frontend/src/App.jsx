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

let tempName = 'John'

console.log(<Footer tempName={tempName}/>)

function App() {


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
<BooksMath/>
</Route>

<Route exact path='/other_stems'>
<BooksStem/>
</Route>

<Route exact path='/kindle_maths'>
<KindleMath/>
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