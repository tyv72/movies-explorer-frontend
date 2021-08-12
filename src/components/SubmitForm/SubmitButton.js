import React from "react";
import classnames from "classnames";

import './SubmitButton.css';

const SubmitButton = ({ className, disabled, children, ...props }) => {
  return (
    <button 
      type="submit" 
      className={ classnames('submit-button', {'submit-button_inactive' : disabled }) }
      disabled={disabled}
      {...props}
    >
        { children }
    </button>          
  );
};

export default SubmitButton;