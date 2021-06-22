import FilterCheckBox from '../FilterCheckBox/FilterCheckBox.js';
import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form">
      <fieldset className="search-form__fieldset">
        <input type="text" className="search-form__input" placeholder="Фильм" />
        <button type="submit" className="search-form__button" />
      </fieldset>      
      <fieldset className="search-form__fieldset">
        <FilterCheckBox />
        <label className="search-form__label">Короткометражки</label>
      </fieldset>      
    </form>
  );
}

export default SearchForm;