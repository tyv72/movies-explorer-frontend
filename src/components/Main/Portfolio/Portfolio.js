import './Portfolio.css';

function Portfolio () {
  return (
    <>
      <h3 className="portfolio-header">Портфолио</h3>
      <ul className="portfolio">
        <li className="portfolio-item">
          <p className="portfolio-item__site-desc">Статичный сайт</p>
          <a href="https://github.com/tyv72/how-to-learn" className="portfolio-item__site-link">&#129125;</a>
        </li>
        <li className="portfolio-item">
          <p className="portfolio-item__site-desc">Адаптивный сайт</p>
          <a href="https://github.com/tyv72/russian-travel" className="portfolio-item__site-link">&#129125;</a>
        </li>
        <li className="portfolio-item">
          <p className="portfolio-item__site-desc">Одностраничное приложение</p>
          <a href="https://github.com/tyv72/react-mesto-api-full" className="portfolio-item__site-link">&#129125;</a>
        </li>        
      </ul>
    </>    
  );
}

export default Portfolio;