import React from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './Profile.css';

function Profile(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isEditEnabled, setIsEditEnabled] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangeMode() {
    setIsEditEnabled(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      email,
    });
    setIsEditEnabled(false);         
  }

  return (
    <section className="profile app-background_color_dark">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h1 className="profile-form__header">Привет, {currentUser.name}!</h1>
        <fieldset className="profile-form__fieldset">
          <label for="name" className="profile-form__label">Имя</label>
          <input type="text" id="name" className="profile-form__input"  value={name} onChange={handleChangeName} enabled={isEditEnabled}/>
        </fieldset>
        <fieldset className="profile-form__fieldset">
          <label for="email" className="profile-form__label">E-mail</label>
          <input type="text" id="email" className="profile-form__input"  value={email} onChange={handleChangeEmail} enabled={isEditEnabled}/>
        </fieldset>
        {isEditEnabled && <button type="submit" className="profile-form__button">Сохранить</button>}
        {!isEditEnabled && <button type="button" className="profile-form__button" onClick={handleChangeMode}>Редактировать</button>}
        <Link className="profile-form__link" to='/movies' onClick={props.handleLogout}>Выйти из аккаунта</Link>              
      </form>
    </section>    
  );
}

export default Profile;