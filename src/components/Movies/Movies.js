import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import { initialCards } from './../../utils/constants.js';

function Movies () {
  return (
    <div className="movies app-background_color_dark">
      <SearchForm />
      <MoviesCardList cards={initialCards}/>
    </div>    
  );
}

export default Movies;