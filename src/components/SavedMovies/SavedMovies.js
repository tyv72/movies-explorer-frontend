import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import { savedCards } from './../../utils/constants.js';

function SavedMovies () {
  return (
    <div className="movies app-background_color_dark">
      <SearchForm />
      <MoviesCardList cards={savedCards}/>
    </div>    
  );
}

export default SavedMovies;