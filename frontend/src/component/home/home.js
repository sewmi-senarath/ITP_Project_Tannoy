import React from 'react';
import './home.css';

function Home() {
  return (
    <div className="homepage">
      {/* First Section (INTERIOR DESIGN) */}
      <div id="interior-design" className="background-image">
        <div className="content">
          <h1 className="company-name">Tannoy Electricals</h1>
          <h2 className="headline">SUSTAINABLE INNOVATION IN ELECTRICAL MANUFACTURING</h2>
          <p className="description">
          Tannoy Electrical Industries specializes in delivering high-quality electrical equipment made from recycled plastics, prioritizing sustainability in every step of production.
          </p>
        </div>
      </div>

      {/* Second Section (WELCOME TO OUR COMPANY) */}
      <div id="welcome-section" className="welcome-section">
        <div className="welcome-image"></div>
        <div className="welcome-text">
          <h2 className="welcome-title">WELCOME TANNOY ELECTRICAL INDUSTRIES!</h2>
          <p className="welcome-description">
          We are proud to be at the forefront of sustainable innovation, delivering cutting-edge electrical products made from recycled plastics. Our commitment to the environment is matched by our dedication to producing high-quality, reliable solutions that meet the demands of a rapidly changing world. Whether you're a new customer or a long-term partner, we welcome you to explore how we are shaping a greener, more efficient future.
          </p>
          <p className="welcome-description">
          At Tannoy, we believe that sustainability and technology go hand in hand. Our team is driven by a passion for eco-friendly manufacturing, ensuring that every step of our production process reflects our core values of responsibility and excellence. From the materials we use to the services we offer, we are focused on reducing our environmental impact while maintaining the highest standards of product performance. We look forward to working with you to create a future where innovation supports both people and the planet.
          </p>
        </div>
      </div>

      {/* Third Section (OUR SERVICE) */}
      <div id="service-section" className="service-section">
        <div className="service-content">
          <h2 className="service-title">OUR SERVICE</h2>
          <p className="service-description">
          At Tannoy Electrical Industries, we provide a wide range of electrical equipment, crafted with precision from recycled materials. Our services include efficient delivery of raw materials to factories and final products to customers, ensuring timely fulfillment. We also offer customized solutions tailored to the unique needs of our clients, enhancing productivity while reducing environmental impact.
          </p>
        </div>
        <div className="service-images">
          <div className="service-image-left"></div>
          <div className="service-image-right"></div>
        </div>
        <div className="service-statistics">
          <h3>100K+</h3>
          <p>Service For Client</p>
        </div>
      </div>

      {/* Fourth Section (OUR MISSION) */}
      <section id="mission-section" className="mission-section">
        <div className="mission-image"></div>
        <div className="mission-text">
          <h2 className="mission-title">OUR MISSION</h2>
          <div className="mission-item">
            <h3>01</h3>
            <p>Lead the industry in producing innovative and eco-friendly electrical products.</p>
          </div>
          <div className="mission-item">
            <h3>02</h3>
            <p>Reduce plastic waste through sustainable manufacturing practices.</p>
          </div>
          <div className="mission-item">
            <h3>03</h3>
            <p>Combine cutting-edge technology with environmental responsibility.</p>
          </div>
          <div className="mission-item">
            <h3>04</h3>
            <p>Drive positive change in both the electrical sector and the environment.</p>
          </div>
          <div className="mission-item">
            <h3>05</h3>
            <p>Build a better future by promoting responsible and efficient production methods.</p>
          </div>
        </div>
      </section>

      {/* Fifth Section (OUR CONTACT) */}
      <section id="contact-section" className="contact-section">
        <div className="contact-image"></div>
        <div className="contact-text">
          <h2 className="contact-title">OUR CONTACT</h2>
          <ul className="contact-details">
            <li><i className="fa fa-phone" aria-hidden="true"></i> 077-730 7206 OR 076-730 7206</li>
            <li><i className="fa fa-globe" aria-hidden="true"></i> www.tannoyElectrical.com</li>
            <li><i className="fa fa-envelope" aria-hidden="true"></i> tannoy266@gmail.com</li>
            <li><i className="fa fa-map-marker" aria-hidden="true"></i> 266/2A, Mabima, Heiyanthuduwa, Kelaniya, Sri Lanka</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
