import React from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import Preloader from '../Preloader/Preloader.js';
import { useFormWithValidation } from '../../utils/validation.js';
import './Profile.css';

function Profile(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isEditEnabled, setIsEditEnabled] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [okResult, setOkResult] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const { handleChange, errors, isValid, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]); 

  function handleChangeName(e) {
    setName(e.target.value);
    handleChange(e);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    handleChange(e);
  }

  function handleChangeMode() {
    setIsEditEnabled(true);
    setOkResult(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    props.onUpdateUser({
      name,
      email,
    }).then((res) => {
      setIsSubmitting(false);
      setIsEditEnabled(false);
      setOkResult(true);
      resetForm();
    }).catch((err) => {
      console.log(err);
      setIsSubmitting(false);
      setIsEditEnabled(false);
      setOkResult(false);
      resetForm();
    });             
  }

  return (
    <section className="profile app-background_color_dark">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className={`profile-preloader ${isSubmitting && 'profile-preloader_opened'}`}>
          <Preloader />
        </div>
        <h1 className="profile-form__header">Привет, {currentUser.name}!</h1>
        <fieldset className="profile-form__fieldset">
          <label for="name" className="profile-form__label">Имя</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            className="profile-form__input"
            value={name}
            onChange={handleChangeName} 
            disabled={!isEditEnabled ? "true" : undefined} 
            required
          />
        </fieldset>
        <fieldset className="profile-form__fieldset">
          <label for="email" className="profile-form__label">E-mail</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="profile-form__input" 
            value={email}
            onChange={handleChangeEmail} 
            disabled={!isEditEnabled ? "true" : undefined} 
            required 
            pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"
          />
        </fieldset>
        {Object.keys(errors).map((errorKey, i) => (
          errorKey && errors[errorKey] !== "" && <span key={errorKey} className="profile-form__error">{"Ошибка в поле " + errorKey + "! " + errors[errorKey]}</span>
        ))}
        {okResult && <span className="profile-form__info">Данные успешно сохранены!</span>}
        {isEditEnabled && <button type="submit" className="profile-form__button" enabled={ isSubmitting | !isValid | Object.keys(errors).length > 0 ? "false" : "true"}>Сохранить</button>}
        {!isEditEnabled && <button type="button" className="profile-form__button" onClick={handleChangeMode}>Редактировать</button>}
        <Link className="profile-form__link" to='/movies' onClick={props.handleLogout}>Выйти из аккаунта</Link>              
      </form>
    </section>    
  );
}

export default Profile;