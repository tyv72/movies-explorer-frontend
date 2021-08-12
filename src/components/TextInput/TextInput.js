import React from "react";
import { useField } from "formik";

import './TextInput.css';

const TextInput = (props) => {
  const [field, meta] = useField(props);
    
  return (
    <>
      <input
        {...field} 
        className={meta.touched && meta.error ? 'form-input form-input_incorrect' : 'form-input'} 
        {...props} 
      />
      { meta.touched && meta.error && <span className='form-error'>{meta.error}</span> }
    </>
  );
};

export default TextInput;