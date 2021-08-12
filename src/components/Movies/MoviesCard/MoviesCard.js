import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const card = props.card;
    
  function toTrailer(link) {
    document.location.href = link;
  }

  function format(duration) {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    let res = hours > 0 ? "" + hours + "h " : "";
    res = mins > 0 ? res + mins + "min" : "";
    return res;
  }

  return (
    <figure className="card">
      <img className="card__link" src={card.image} alt={card.nameRU} onClick={() => toTrailer(card.trailer)}/>  
      {props.saved && <button className="card__unsave" onClick={() => props.onToggle(card)}></button>}
      {!props.saved && !card.saved && <button className="card__save" onClick={() => props.onToggle(card)}>Сохранить</button>}
      {!props.saved && card.saved && <button className="card__saved" onClick={() => props.onToggle(card)}></button>}
      <figcaption className="card__caption">
        <p className="card__description">{card.nameRU}</p>
        <p className="card__time">{format(card.duration)}</p>            
      </figcaption>        
    </figure>
  );
}

export default MoviesCard;