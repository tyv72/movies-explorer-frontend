import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Logo from '../Logo/Logo.js';
import TextInput from '../TextInput/TextInput.js';
import SubmitButton from '../SubmitForm/SubmitButton.js';

import './Register.css';
import Preloader from '../Preloader/Preloader.js';

function Register(props) {
  const [okResult, setOkResult] = React.useState(true);
  const history = useHistory();

  return (
    <section className="register app-background_color_dark">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}

        validationSchema={Yup.object({
          name: Yup.string()
            .required("Обязательное поле"),
          email: Yup.string()
            .email("Некорректный формат эл.почты")
            .required("Обязательное поле"),
          password: Yup.string()
            .required("Обязательное поле"),
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          props.onRegister(values)
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
          <Form className="register-form">
            <div className={`register-preloader ${isSubmitting && 'register-preloader_opened'}`}>
              <Preloader />
            </div>            
            <Logo />
            <h1 className="register-form__header">Добро пожаловать!</h1>
            <label htmlFor="name" className="register-form__label">Имя</label>
            <TextInput type="text" name="name"/>
            <label htmlFor="email" className="register-form__label">E-mail</label>
            <TextInput type="text" name="email"/>
            <label htmlFor="password" className="register-form__label">Пароль</label>
            <TextInput type="password" name="password"/>
            { !isSubmitting && !okResult && <span className="register-form__result_invalid">
              Что-то пошло не так...
            </span> }
            <SubmitButton 
              name="submit"
              disabled={ isSubmitting | (Object.keys(errors).length > 0) }
            >Зарегистрироваться</SubmitButton>
            <span className="register-form__link-capture">
              Уже зарегистрированы?
              <Link className="register-form__link" to='/signin'>Войти</Link>
            </span>                 
          </Form>           
        )}
      </Formik>
    </section>    
  );
}

export default Register;