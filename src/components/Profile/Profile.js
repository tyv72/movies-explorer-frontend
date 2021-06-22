import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
  return (
    <section className="profile app-background_color_dark">
      <form className="profile-form">
        <h1 className="profile-form__header">Привет, Юлия!</h1>
        <fieldset className="profile-form__fieldset">
          <label for="name" className="profile-form__label">Имя</label>
          <input type="text" id="name" className="profile-form__input" value={props.name} enabled={false}/>
        </fieldset>
        <fieldset className="profile-form__fieldset">
          <label for="email" className="profile-form__label">E-mail</label>
          <input type="text" id="email" className="profile-form__input" value={props.email} enabled={false}/>
        </fieldset>
        <button type="submit" className="profile-form__button">Редактировать</button>
        <Link className="profile-form__link" to='/movies'>Выйти из аккаунта</Link>              
      </form>
    </section>    
  );
}

export default Profile;