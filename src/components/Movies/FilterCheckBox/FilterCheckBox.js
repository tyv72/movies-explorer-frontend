import './FilterCheckBox.css';

function FilterCheckBox() {
  return (
    <label class="checkbox">
      <input class="checkbox__input"/>
      <span class="checkbox__switch"></span>
    </label>
  );
}

export default FilterCheckBox;