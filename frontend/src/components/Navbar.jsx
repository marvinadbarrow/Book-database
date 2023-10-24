import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export const Navbar = () =>{

    return(

<nav className="navbar-div">
    <div className="nav-links-div">
    <Link to="/maths" className="nav-link">Math Books</Link>
    <Link to="/users_all" className="nav-link">Users</Link>
    <Link to="/users_individual" className="nav-link">Lookup</Link>
    <Link to="/" className="nav-link">Home</Link>
    <Link to="/login" className="nav-link">LogIn</Link>
    <Link to="/signup" className="nav-link">SignUp</Link>
    <Link to="/about" className="nav-link">About</Link>
    <Link to="/contact" className="nav-link">Contact</Link>
    </div>
</nav>
      
    )
}