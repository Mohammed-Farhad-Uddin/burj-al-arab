import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/icons/logo.png'
import header from '../../images/header.png'
import './Header.css'

const Header = () => {
    return (
        <div className="header" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${header})`}}>
            <nav>
                <ul>
                    <li>
                        <Link to='/home'>
                            <img className="logo" src={logo}/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/book'>Book</Link>
                    </li>
                </ul>
            </nav>    
            <div className="title-container">
                    <h1>Burj Al Arab</h1>
                    <h2>A Global icon of Arabian Luxury</h2>
            </div>                      
        </div>
    );
};

export default Header;              