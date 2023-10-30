import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';


export const Navbar = () =>{

    return(

<nav className="navbar-div navbar-dark bg-dark navbar-expand">
    <div className="nav-links-div">
    <NavLink to="/" className="nav-link">Home</NavLink>
    <NavLink to="/admins" className="nav-link" activeClassName="selected">Admin Log in</NavLink>
    <NavLink to="/login" className="nav-link" activeClassName="selected">LogIn</NavLink>
    <NavLink to="/signup" className="nav-link" activeClassName="selected">SignUp</NavLink>
    </div>
</nav>
      
    )
}