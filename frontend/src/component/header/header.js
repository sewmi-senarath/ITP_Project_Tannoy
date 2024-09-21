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
                <a href="/recycle-product-dashbord">Recycle Products</a> {/* Gangani */}
=======
                <a href="/recycle-product-dashbord">Products</a> {/* Gangani */}
>>>>>>> c3e588576d2b4ad64dc6be65f6f43e8a245f146a
                <a href="/employee-dashboard">Employee Team</a>
                <a href="/deliveryHome">Delivery</a>
                <a href="#">Login</a>
                <a href="#">Register</a>
            </nav>
        </header>
    );
}

export default Header;
