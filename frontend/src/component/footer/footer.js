import React from 'react';
import '../App.css';
import Logo from '../images/logo.jpg';
import facebook from '../images/facebook.jpeg';
import instagram from '../images/instagram.jpeg';
import linkedin from '../images/linkedin.jpeg';


const Footer = () => {
    return (
        <footer className="tannoy-footer">
            <div className="tannoy-footer-logo">
                <img src={Logo} alt="Tannoy Logo" />
                <p>Lorem ipsum dolor amet consectetur adi pisicing elit sed eiusm tempor incidunt ut labore dolore.</p>
                <address>Add: 70 Upper St Norwich NR2.<br /> Call: 01-123 5641 231<br /> Email: info@edublink.com</address>
            </div>
            <div className="tannoy-footer-links">
                <h3>Social Media Platforms</h3>
                <div className="tannoy-social-icons">
                    <a href="#"><img src={facebook} alt="Facebook" /></a> 
                    <a href="#"><img src={instagram} alt="Instagram" /></a>
                    <a href="#"><img src={linkedin} alt="LinkedIn" /></a>
                </div>
                <h3>Contacts</h3>
                <form>
                    <label htmlFor="email">Enter your email address to register to our newsletter subscription</label>
                    <input type="email" id="email" placeholder="Enter your Email" />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
            <p>&copy; 2024 Tannoy Electricals</p>
        </footer>
    );
}

export default Footer;
