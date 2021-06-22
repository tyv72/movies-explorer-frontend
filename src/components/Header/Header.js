import headerLogo from '../../images/logo.png';
import './Header.css';

function Header(props) {
  const background_color = props.loggedIn ? 'dark' : 'blue';
  return (
    <header className={`header app-background_color_${background_color}`}>
      <img src={headerLogo} alt="Логотип" className="header__logo"/> 
      {props.children}           
    </header>
  );
}

export default Header;