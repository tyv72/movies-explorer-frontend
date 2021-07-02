import './AboutProject.css';

function AboutProject() {
  return (
    <article className="about-project" id="about-project">
      <ul className="about-project__desc">
        <li className="about-project__paragraph">
          <h2 class="about-project__title">Дипломный проект включал 5 этапов</h2>
          <p class="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__paragraph">
          <h2 class="about-project__title">На выполнение диплома ушло 5 недель</h2>
          <p class="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li> 
      </ul>
      <ul className="about-project__spent">
        <li className="about-project__spent-item1">1 неделя</li>
        <li className="about-project__spent-item2">4 недели</li>
        <li className="about-project__spent-item">Back-end</li>
        <li className="about-project__spent-item">Front-end</li>
      </ul>  
    </article>
  );
}

export default AboutProject;