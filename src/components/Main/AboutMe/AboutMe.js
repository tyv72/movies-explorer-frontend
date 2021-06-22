import './AboutMe.css';
import photo from '../../../images/Me.jpg';

function AboutMe() {
  return (
    <article className="about-me" id="about-me">
      <div className="about-me__desc">
        <h2 className="about-me__title">Юлия</h2>
        <h3 className="about-me__subtitle">Фронтенд-разработчик</h3>
        <p className="about-me__text">Живу и работаю в Новосибирске. Окончила НГУ по специальности "Прикладная математика и информатика". Работала в разных организациях - сопровождала 1С, работала аналитиком, на текущий момент перешла в разработку на java. Разработка на javascript - пока хобби, но, надеюсь, когда-нибудь буду выполнять реальные задачи и по верстке. </p>
        <nav className="about-me__nav">
          <a href="https://github.com/tyv72" className="about-me__link">Github</a>
          <a href="https://github.com/tyv72/" className="about-me__link">Facebook</a>
        </nav>
      </div>
      <img src={photo} alt="Фото" className="about-me__photo"/>
    </article>
  );
}

export default AboutMe;