import React from 'react';

import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import * as mainApi from '../../utils/MainApi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function SavedMovies (props) {
  const [savedMovies, setSavedMovies] = React.useState();
  const [filteredMovies, setFilteredMovies] = React.useState();
  const [isSearchError, setIsSearchError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  
  // Данный хук будет выполнен только при монтировании компонента.
  // Затем вся фильтрация будет выполняться только по savedMovies.
  // Здесь выполняем новый поиск в БД, т.к. на эту вкладку можно зайти
  // не выполняя поиск на основной вкладке с Фильмами.
  React.useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem('jwt');

    mainApi.getMovies(token)
    .then((movies) => {
      const receivedMovies = movies.data
        .filter((movie) => movie.owner === currentUser._id)
        .map((movie) => Object.assign(movie, {saved: true}));
      setSavedMovies(receivedMovies);
      setFilteredMovies(receivedMovies); 
      // Таким образом обновляем список сохраненных фильмов для основной формы.
      props.onOpen(receivedMovies);   
      setIsLoading(false);                                  
    })
    .catch((err) => {
      setIsSearchError(true);
      setIsLoading(false);
      console.log(err);
    });
    
  }, []);

  const handleSavedSearch = (checked, searchWord) => {
    setFilteredMovies(savedMovies
      .filter((movie) => {
        const includeMovie = checked ? movie.duration <= 40 : true;
        const containRU = movie.nameRU && movie.nameRU.toLowerCase().includes(searchWord.toLowerCase());
        const containEN = movie.nameEN && movie.nameEN.toLowerCase().includes(searchWord.toLowerCase());
        return includeMovie && (containRU || containEN);
      }));
  }

  const onToggleMovie = (card) => {
    // После того, как удалили фильм, нужно обновить список на форме.
    props.onToggleMovie(card).then((res) => {
      const newFilteredMovies = filteredMovies.filter((movie) => movie._id !== card._id);
      setFilteredMovies(newFilteredMovies);
    });    
  }

  return (
    <div className="movies app-background_color_dark">
      <SearchForm onSearch={handleSavedSearch}/>
      {isLoading && <Preloader />}
      {!isLoading && !isSearchError &&
        <MoviesCardList 
          cards={filteredMovies} 
          onToggleMovie={onToggleMovie} 
          saved={true}
        />
      }
      {!isLoading && isSearchError && <span className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>}
    </div>    
  );
}

export default SavedMovies;