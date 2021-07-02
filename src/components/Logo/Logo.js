import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.png';
import './Logo.css';

function Logo() {
  return (
    <Link className="header__link" to="/">
      <img src={headerLogo} alt="Логотип" className="header__logo"/>
    </Link>
  )
}

export default Logo;