import React from 'react';
import '../../component/delivery/Header.css'; // Assuming the same CSS is used for layout

const Sidebar = () => (
  <div id="sidebar">
    <div id="sidebar-logo">
      <h2>Tannoy Electricals</h2> 
    </div>
    <nav id="sidebar-nav">
      <ul>
        <li><a href="/deliveryHome">Home</a></li>
        <li><a href="/parsel-list">Tracking</a></li>
        <li><a href="/Add-parsel">Add Delivery Request</a></li>
        <li><a href="/">Log Out</a></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
