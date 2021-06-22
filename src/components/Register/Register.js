import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.png';
import './Register.css';

function Register(props) {
  return (
    <section className="register app-background_color_dark">
      <form className="register-form">
        <img src={headerLogo} alt="Логотип" className="header__logo"/>
        <h1 className="register-form__header">Добро пожаловать!</h1>
        <label for="name" className="register-form__label">Имя</label>
        <input type="text" id="name" className="register-form__input" />
        <label for="email" className="register-form__label">E-mail</label>
        <input type="text" id="email" className="register-form__input" />
        <label for="password" className="register-form__label">Пароль</label>
        <input type="password" id="password" className="register-form__input" />
        <span className="register-form__error">Что-то пошло не так...</span>
        <button type="submit" className="register-form__button">Зарегистрироваться</button>
        <span className="register-form__link-capture">
          Уже зарегистрированы?
          <Link className="register-form__link" to='/signin'>Войти</Link>
        </span>      
      </form>
    </section>    
  );
}

export default Register;