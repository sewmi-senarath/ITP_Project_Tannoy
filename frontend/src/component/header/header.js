import React from 'react';
import '../../App.css';
import Logo from '../../images/logo.jpeg';


const Header = () => {
    return (
        <header className="tannoy-header">
            <div className="tannoy-logo">
                <img src={Logo} alt="Tannoy Logo" /> 
                <h1>Tannoy Electricals</h1>
            </div>
            <nav className="tannoy-nav">
                <a href="/">Home</a>
<<<<<<< HEAD
                <a href="/product-dashbord">Products</a> {/* Gangani */}
=======
                <a href="/product-dashbord">Products</a>
>>>>>>> 72053426c7e9a976bc75a5347fdad3c3f90504ca
                <a href="/employee-dashboard">Employee Team</a>
                <a href="/deliveryHome">Delivery</a>
                <a href="#">Login</a>
                <a href="#">Register</a>
            </nav>
        </header>
    );
}

export default Header;
