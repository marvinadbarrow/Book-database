import { useEffect, useState } from "react"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';



export const HomeButton = ({}) =>{



    return(
        <>
        <div className="main-page-home-link">
        <Link to="/" className="home-link">Bookstore Home</Link>
</div>
        
        
        </>
    )
}