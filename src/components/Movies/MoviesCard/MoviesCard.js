import './MoviesCard.css';

function MoviesCard(props) {
  const card = props.card;
  return (
    <figure className="card">
      <img className="card__link" src={card.link} alt={card.name}/>  
      <button className="card__save">Сохранить</button>
      <figcaption className="card__caption">
        <p className="card__description">{card.name}</p>
        <p className="card__time">{card.time}</p>            
      </figcaption>        
    </figure>
  );
}

export default MoviesCard;