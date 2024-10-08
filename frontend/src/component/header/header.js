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
                <a href="/recycle-product-dashbord">Recycle Products</a> {/* Gangani */}
                <a href="/employee-dashboard">Employee Team</a>
                <a href="/deliveryHome">Delivery</a>
<<<<<<< HEAD
                <a href="/InvestorsDashboard">FinanceInvestor</a>
                <a href="/login">Login</a>
=======
                <a href="/investors">FinanceInvestor</a>
                <a href="/productDashboard">Inventory & Supplier</a>
                <a href="/">Login</a>
>>>>>>> 71585d1b59e41ba153df8d580c2b101dc93eb70d
                <a href="/register">Register</a>
            </nav>
        </header>
    );
}

export default Header;
