import './Movies.css';
import React from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';

function Movies (props) {
  return (
    <div className="movies app-background_color_dark">
      <SearchForm onSearch={props.onSearch} />
      {props.isLoading && <Preloader />}
      {!props.isLoading && !props.isSearchError && 
        <MoviesCardList 
          cards={props.movies} 
          onToggleMovie={props.onToggleMovie} 
          saved={false}
          isNewSearch={props.isNewSearch}
        />
      }
      {!props.isLoading && props.isSearchError && <span className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>}
    </div>    
  );
}

export default Movies;