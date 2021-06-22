import './Footer.css';

function Footer(props) {
  return (
    <footer className="footer app-background_color_dark">
      <p className="footer__desc">Учебный проект Яндекс.Практикум х BeatFilm</p>
      <div className="footer__columns">
        <p className="footer__column">&copy; 2021</p>
        <ul className="footer__menu">
          <li className="footer__menu-item">
            <a href="https://praktikum.yandex.ru" className="footer__menu-link">Яндекс.Практикум</a>
          </li>
          <li className="footer__menu-item">
            <a href="https://github.com/tyv72" className="footer__menu-link">Github</a>
          </li>
          <li className="footer__menu-item">
            <a href="https://github.com/tyv72" className="footer__menu-link">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;