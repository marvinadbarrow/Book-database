import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export const Footer = () =>{

    return(

<footer className="footer">
    <div className="footer-content">
   
<div className="footer-links-div">
<Link to="/about" className="footer-link">About</Link>
<Link to="/contact" className="footer-link">Contact</Link>
</div>
<p className="copyright-para">&copy; 2023 Mern Stack Bookstore</p>



    </div>
</footer>
      
    )
}