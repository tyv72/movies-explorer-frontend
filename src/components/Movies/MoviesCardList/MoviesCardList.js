import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {
  const [cards, setCards] = React.useState([]);
  const [cardsInPortion, setCardsInPortion] = React.useState(3);
  
  React.useEffect(() => {
    // Порции нарезаем только для основной вкладки
    if (!props.saved && props.cards) {
      setCards(props.cards.slice(0, cardsInPortion));
    }
    
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  React.useEffect(() => {
    // Для вкладки "Сохраненные" вытаскиваем весь список
    if (props.saved) {
      setCards(props.cards);
    }   
  }, [props.cards, props.saved]);

  function updateDimensions() {
    if (window.innerWidth >= 1280) {
      setCardsInPortion(3);
    } else if (window.innerWidth >= 768) {
      setCardsInPortion(2);
    } else {
      setCardsInPortion(1);
    }
  };

  function getNextPortion() {
    const delta = 
      props.cards.length - cards.length > cardsInPortion 
      ? cardsInPortion 
      : props.cards.length - cards.length;

    setCards(props.cards.slice(0, cards.length + delta));
  }

  return (
    <>
      <section className="card-gallery">   
        {cards.map((card, i) => (
          <MoviesCard key={card.movieId} card={card} onToggle={props.onToggleMovie} saved={props.saved}/>
        ))}                                     
      </section>
      {props.cards && props.cards.length === 0 && <span className="card-gallery__empty">Ничего не найдено...</span>}
      {props.cards && props.cards.length > cards.length && <button className="card-gallery__more" onClick={getNextPortion}>
        Ещё
      </button>}
    </>    
  );
}

export default MoviesCardList;