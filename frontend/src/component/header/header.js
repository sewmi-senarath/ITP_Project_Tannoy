import React from 'react';
import '../App.css';
import Logo from '../images/logo.jpg';


const Header = () => {
    return (
        <header className="tannoy-header">
            <div className="tannoy-logo">
                <img src={Logo} alt="Tannoy Logo" /> 
                <h1>Tannoy Electricals</h1>
            </div>
            <nav className="tannoy-nav">
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">Inquiry Team</a>
                <a href="#">Login</a>
                <a href="#">Register</a>
            </nav>
        </header>
    );
}

export default Header;
