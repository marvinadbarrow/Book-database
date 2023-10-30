import { useState } from 'react';
import {Login} from './Login'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';




export const HomePage = () =>{

    return(
        <>
          <h1> Welcome to Bookstore</h1>
          <div className="category-div">


          <div className="all-books-btn-div">
        <button className="all-books-btn" onClick={returnToBooks}>Get users</button></div>

        <div className="all-books-btn-div">
        <button className="all-books-btn" onClick={returnToBooks}>Add book - kindle</button></div>

        <div className="all-books-btn-div">
        <button className="all-books-btn" onClick={returnToBooks}>Add book - hardcopy</button></div>

        <div className="all-books-btn-div">
        <button className="all-books-btn" onClick={returnToBooks}>Edit book info</button></div>

        <div className="all-books-btn-div">
        <button className="all-books-btn" onClick={returnToBooks}>Delete book</button></div>

          </div>
    
        </>

    )
}