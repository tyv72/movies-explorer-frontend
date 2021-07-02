import './MoviesCard.css';

function MoviesCard(props) {
  const card = props.card;
  return (
    <figure className="card">
      <button className="card__saved"></button>
      <img className="card__link" src={card.link} alt={card.name}/>  
      {card.saved && !props.saved && <button className="card__saved"></button>}
      {card.saved && props.saved && <button className="card__unsave"></button>}
      {!card.saved && <button className="card__save">Сохранить</button>}
      <figcaption className="card__caption">
        <p className="card__description">{card.name}</p>
        <p className="card__time">{card.time}</p>            
      </figcaption>        
    </figure>
  );
}

export default MoviesCard;