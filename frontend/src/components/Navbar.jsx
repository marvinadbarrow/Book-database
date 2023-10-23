import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export const Navbar = () =>{

    return(

<nav className="navbar-div">
    <div className="nav-links-div">
    <Link to="/" className="nav-link">Home</Link>
    <Link to="/signin" className="nav-link">SignIn</Link>
    <Link to="/signup" className="nav-link">SignUp</Link>
    <Link to="/about" className="nav-link">About</Link>
    <Link to="/contact" className="nav-link">Contact</Link>
    </div>
</nav>
      
    )
}