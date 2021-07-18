import React from 'react';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox.js';
import { useFormWithValidation } from '../../../utils/validation.js';
import './SearchForm.css';

function SearchForm(props) {
  const [checked, setChecked] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState();
  const { handleChange, errors, isValid } = useFormWithValidation();
    
  function toggleCheck() {
    setChecked(!checked);
    props.onSearch(!checked, searchWord);
  }

  const handleSearchChange = (e) => {
    const {value} = e.target;
    setSearchWord(value);  
    handleChange(e); 
  }

  const onSearch = (e) => {
    e.preventDefault();
    props.onSearch(checked, searchWord);      
  }

  return (
    <form className="search-form" onSubmit={onSearch}>
      <fieldset className="search-form__fieldset">
        <input type="text" name="search" className={errors['search'] ? "search-form__input-error" : "search-form__input"} onChange={handleSearchChange} placeholder={errors['search'] ? errors['search'] : "Фильм"} required />
        <button type="submit" className="search-form__button" disabled={ !isValid } />
      </fieldset>      
      <fieldset className="search-form__fieldset">
        <FilterCheckBox onClick={toggleCheck} checked={checked}/>
        <label className="search-form__label">Короткометражки</label>
      </fieldset>      
    </form>
  );
}

export default SearchForm;