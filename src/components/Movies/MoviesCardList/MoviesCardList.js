import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {
  const [cards, setCards] = React.useState([]);
  const [cardsInPortion, setCardsInPortion] = React.useState();
  const MAX_WIDTH = 1280;
  const MIDDLE_WIDTH = 768;
  
  React.useEffect(() => {
    // Устанавливаем количество в новых порциях в зависимости от ширины экрана.
    // Устанавливаем слушатель изменения ширины.
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  React.useEffect(() => {
    // При переключении между вкладками или при изменении общего списка карточек:
    if (props.saved && props.cards) {
      // Для вкладки "Сохраненные" вытаскиваем весь список
      setCards(props.cards.slice());      
    } else if (props.cards && cards.length === 0) {
      // Порции нарезаем только для основной вкладки.
      // Здесь устанавливаем только самую первую порцию, остальные будут получены по Ещё.
      setCards(props.cards.slice(0, getInitialCardCount()));      
    }
  }, [cards.length, props.cards, props.saved]);

  function updateDimensions() {
    if (window.innerWidth >= MAX_WIDTH) {
      setCardsInPortion(3);
    } else if (window.innerWidth >= MIDDLE_WIDTH) {
      setCardsInPortion(2);
    } else {
      setCardsInPortion(2);
    }
  };

  function getInitialCardCount() {
    if (window.innerWidth >= MAX_WIDTH) {
      return 12;
    } else if (window.innerWidth >= MIDDLE_WIDTH) {
      return 8;
    } else {
      return 5;
    }
  };

  function setNextPortion() {
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
      {props.cards && props.cards.length > cards.length && <button className="card-gallery__more" onClick={setNextPortion}>
        Ещё
      </button>}
    </>    
  );
}

export default MoviesCardList;