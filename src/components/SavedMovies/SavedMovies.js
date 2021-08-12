import React from 'react';

import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import * as mainApi from '../../utils/MainApi.js';

function SavedMovies (props) {
  const [savedMovies, setSavedMovies] = React.useState();
  const [filteredMovies, setFilteredMovies] = React.useState();
  const [isSearchError, setIsSearchError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
   
  // Данный хук будет выполнен только при монтировании компонента.
  // Затем вся фильтрация будет выполняться только по savedMovies.
  // Здесь выполняем новый поиск в БД, т.к. на эту вкладку можно зайти
  // не выполняя поиск на основной вкладке с Фильмами.
  React.useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem('jwt');

    Promise.all([mainApi.getUserInfo(token), mainApi.getMovies(token)])
      .then(([userData, savedMoviesData]) => { 
        // Достаем сохраненные только по текущему пользователю
        const storedSavedMovies = savedMoviesData.data
          .filter((movie) => movie.owner === userData.data._id)
          .map((movie) => Object.assign(movie, {saved: true}));
        setSavedMovies(storedSavedMovies);       
        setFilteredMovies(storedSavedMovies);         
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
      const newSavedMovies = savedMovies.filter((movie) => movie._id !== card._id);
      setSavedMovies(newSavedMovies);
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