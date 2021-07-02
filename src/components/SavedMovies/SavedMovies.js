import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import { initialCards } from './../../utils/constants.js';

function SavedMovies () {
  var savedCards = initialCards.filter(function(card) {
    return card.saved;
  });

  return (
    <div className="movies app-background_color_dark">
      <SearchForm />
      <MoviesCardList cards={savedCards} saved={true}/>
    </div>    
  );
}

export default SavedMovies;