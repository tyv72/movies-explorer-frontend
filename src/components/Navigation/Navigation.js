import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
  return (
    <>
      {!props.loggedIn && <nav className="menu">
        <NavLink className="menu__item" activeClassName="menu__item_active" to='/signup'>Регистрация</NavLink>
        <NavLink className="menu__item" activeClassName="menu__item_active" to='/signin'>Войти</NavLink>        
      </nav>}
      {props.loggedIn && <nav className="menu-movies">
        <div className="menu-movies_centered">
          <NavLink className="menu-movies__item" activeClassName="menu-movies__item_active" to='/movies'>Фильмы</NavLink>
          <NavLink className="menu-movies__item" activeClassName="menu-movies__item_active" to='/saved-movies'>Сохраненные фильмы</NavLink>
        </div>        
        <NavLink className="menu-movies__item" to='/profile'>Аккаунт</NavLink>              
      </nav>}
      {props.loggedIn && <>
        <button className="menu-button" />
        <div className="menu-popup">
          <button className="close-button" />
          <nav className="menu-popup__nav">
            <NavLink className="menu-popup__item" activeClassName="menu-popup__item_active" exact to='/'>Главная</NavLink>
            <NavLink className="menu-popup__item" activeClassName="menu-popup__item_active" to='/movies'>Фильмы</NavLink>
            <NavLink className="menu-popup__item" activeClassName="menu-popup__item_active" to='/saved-movies'>Сохраненные фильмы</NavLink>
          </nav>
          <NavLink className="menu-popup__item" activeClassName="menu-popup__item_active" to='/profile'>Аккаунт</NavLink>      
        </div>
      </>}
    </>    
  );
}

export default Navigation;