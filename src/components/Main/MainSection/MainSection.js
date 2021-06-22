import './MainSection.css';

function MainSection(props) {
  return (
    <section className={`main-section app-background_color_${props.backgroundColor}`}>
      <h3 className="main-section__header">{props.headerText}</h3>
      {props.children}
    </section>
  );
}

export default MainSection;