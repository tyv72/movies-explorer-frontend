import Logo from '../Logo/Logo.js';
import Navigation from '../Navigation/Navigation.js';
import './Header.css';

function Header(props) {
  const background_color = props.background_color;
  return (
    <header className={`header app-background_color_${background_color}`}>
      <div className="header__content">
        <Logo />
        <Navigation loggedIn={props.loggedIn}/>
      </div>                 
    </header>
  );
}

export default Header;