import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Logo from '../Logo/Logo.js';
import TextInput from '../TextInput/TextInput.js';
import SubmitButton from '../SubmitForm/SubmitButton.js';
import Preloader from '../Preloader/Preloader.js';

import './Login.css';

function Login(props) {
  const [okResult, setOkResult] = React.useState(true);
  const history = useHistory();
  
  return (
    <section className="login app-background_color_dark">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}

        validationSchema={Yup.object({
          email: Yup.string()
            .email("Некорректный формат эл.почты")
            .required("Обязательное поле"),
          password: Yup.string()
            .required("Обязательное поле"),
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          props.handleLogin(values)
            .then(() => {
              setOkResult(true); 
              setSubmitting(false); 
              history.push('/movies');             
            })
            .catch(() => {
              setSubmitting(false);
              setOkResult(false);
            });
        }}
      >
        {({ isSubmitting, errors, values, touched }) => (
          <Form className="login-form">
            <div className={`login-preloader ${isSubmitting && 'login-preloader_opened'}`}>
              <Preloader />
            </div>
            <Logo />
            <h1 className="login-form__header">Рады видеть!</h1>
            <label for="email" className="login-form__label">E-mail</label>
            <TextInput type="text" name="email"/>
            <label for="password" className="login-form__label">Пароль</label>
            <TextInput type="password" name="password"/>
            { !isSubmitting && !okResult && <span className="login-form__result_invalid">
              Что-то пошло не так...
            </span> }
            <SubmitButton 
              name="submit"
              disabled={ isSubmitting | (Object.keys(errors).length > 0) }
            >Войти</SubmitButton>
            <span className="login-form__link-capture">
              Ещё не зарегистрированы?
              <Link className="login-form__link" to='/signup'>Регистрация</Link>
            </span>      
          </Form>
        )}
      </Formik>
    </section>    
  );
}

export default withRouter(Login);