import React from 'react';
import '../../styles/Header.css'


const Header = () => (
  <HeaderWrapper>
    <Logo>Tannoy Electricals</Logo>
    <NavMenu>
      <a href="/">Home</a>
      <a href="/tracking">Tracking</a>
      <a href="/delivery">Delivery Team</a>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </NavMenu>
  </HeaderWrapper>
);

export default Header;
