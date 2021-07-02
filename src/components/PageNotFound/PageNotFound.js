import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <h3 className="not-found__title">404</h3>
        <p className="not-found__text">Страница не найдена</p>
      </div>      
      <Link className="not-found__link" to="/">Назад</Link>
    </div>
  )
}

export default PageNotFound;