import Logo from '../Logo/Logo.js';
import './Header.css';

function Header(props) {
  const background_color = props.background_color;
  return (
    <header className={`header app-background_color_${background_color}`}>
      <div className="header__content">
        <Logo />
        {props.children}
      </div>                 
    </header>
  );
}

export default Header;