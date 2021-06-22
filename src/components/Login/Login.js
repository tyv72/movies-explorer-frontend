import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.png';
import './Login.css';

function Login(props) {
  return (
    <section className="login app-background_color_dark">
      <form className="login-form">
        <img src={headerLogo} alt="Логотип" className="header__logo"/>
        <h1 className="login-form__header">Рады видеть!</h1>
        <label for="email" className="login-form__label">E-mail</label>
        <input type="text" id="email" className="login-form__input" />
        <label for="password" className="login-form__label">Пароль</label>
        <input type="password" id="password" className="login-form__input" />
        <button type="submit" className="login-form__button">Войти</button>
        <span className="login-form__link-capture">
          Ещё не зарегистрированы?
          <Link className="login-form__link" to='/signup'>Зарегистрироваться</Link>
        </span>      
      </form>
    </section>    
  );
}

export default Login;