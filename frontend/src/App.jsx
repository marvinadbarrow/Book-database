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
import { Signin } from './pages/SignIn';




function App() {


function getApiBack(){
  Axios.get('https://official-joke-api.appspot.com/random_joke')
  .then(response =>{
setJokes(response.data.setup + '......' + response.data.punchline)
  })

}



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


<Route exact path='/signin'>
<Signin/>
</Route>

  </Switch>
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