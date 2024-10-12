import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-right">
        <li>
          <div className="footer-left"> {/* Changed id to className */}
            <img className="logo" />
            <p className="footer-desc"> {/* Changed id to className */}
              "Amplifying Innovation, Powering Connections: Delivering
              High-Quality Electrical Solutions for a Smarter Future"
            </p>
            <div className="socials social-links"> {/* Changed id to className */}
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </li>
        <li className="features">
          <h2 className="links-header"> {/* Changed id to className */}
            <span>Links</span>
          </h2>
          <ul className="nav-links box-middle"> {/* Changed id to className */}
            <li>
              <a href="home">Home</a>
            </li>
            <li>
              <a href="home">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </li>
        <li>
          <div className="box">
            <div className="subscription-form form-box"> {/* Changed id to className */}
              <input
                type="text"
                name="EmailAddress"
                placeholder="Enter your Email"
              />
              <button type="submit">Subscribe</button>
            </div>
            <form action="#"></form>
          </div>
          <ul className="box-middle">
            <li>
              <a href="#">Terms and Conditions</a>
              <a href="#">FAQ and Feedback</a>
            </li>
          </ul>
        </li>
      </ul>

      <div className="footer-bottom"> {/* Changed id to className */}
        <p>All Right reserved by &copy; Tannoy Electrical Industries 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
