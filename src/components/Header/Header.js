import headerLogo from '../../images/logo.png';
import './Header.css';

function Header(props) {
  const background_color = props.loggedIn ? 'dark' : 'blue';
  return (
    <header className={`header app-background_color_${background_color}`}>
      <div className="header__content">
        <img src={headerLogo} alt="Логотип" className="header__logo"/> 
        {props.children}
      </div>                 
    </header>
  );
}

export default Header;