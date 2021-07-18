import './FilterCheckBox.css';

function FilterCheckBox(props) {
  return (
    <label className="checkbox">
      <input 
        type="checkbox" 
        className={props.checked ? "checkbox__input_checked" : "checkbox__input"} 
        checked={props.checked} 
        onChange={props.onClick}
      />
      <span className="checkbox__switch"></span>
    </label>
  );
}

export default FilterCheckBox;