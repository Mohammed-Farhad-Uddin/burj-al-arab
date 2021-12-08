import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import {useContext} from "react";



const Book = () => {
  const [loggedInUser,setLoggedInUser]=useContext(UserContext)
  const {bedType}=useParams();
    return (
        <div style={{textAlign:"center"}}>
          
          <h1>Hello, {loggedInUser.name}! Let's Book a {bedType} Room  </h1>
          <p>Want a <Link to="/home" style={{color:"black"}}>different room?</Link> </p>        
        </div>
    );
};

export default Book;         