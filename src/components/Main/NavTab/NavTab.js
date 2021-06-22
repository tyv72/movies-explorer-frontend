import './NavTab.css';

function NavTab () {
  return (
    <nav className="nav-tab app-background_color_gray">
      <a href="#about-project" className="nav-tab__item">О проекте</a>
      <a href="#about-techs" className="nav-tab__item">Технологии</a>
      <a href="#about-me" className="nav-tab__item">Студент</a>
    </nav>
  );
}

export default NavTab;