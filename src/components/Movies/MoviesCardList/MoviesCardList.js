import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './../MoviesCard/MoviesCard.js';
import {
  MAX_WIDTH, 
  MIDDLE_WIDTH, 
  PORTION_MAX, 
  PORTION_MIN, 
  INIT_PORTION_MAX, 
  INIT_PORTION_MIDDLE, 
  INIT_PORTION_MIN
} from '../../../utils/constants.js';

function MoviesCardList(props) {
  const [cards, setCards] = React.useState([]);
  const [cardsInPortion, setCardsInPortion] = React.useState();
  // Для того, чтобы отличать новый поиск от кнопки Ещё, чтобы можно было первую порцию 
  // после выполнения поиска корректно нарезать.
  const [isNewSearch, setIsNewSearch] = React.useState(true);
  
  
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
    } else if (props.cards && isNewSearch) {
      // Порции нарезаем только для основной вкладки.
      // Здесь устанавливаем только самую первую порцию, остальные будут получены по Ещё.
      setCards(props.cards.slice(0, getInitialCardCount()));      
    }
    setIsNewSearch(true);
  }, [props.cards, props.saved]);

  function updateDimensions() {
    if (window.innerWidth >= MAX_WIDTH) {
      setCardsInPortion(PORTION_MAX);
    } else if (window.innerWidth >= MIDDLE_WIDTH) {
      setCardsInPortion(PORTION_MIN);
    } else {
      setCardsInPortion(PORTION_MIN);
    }
  };

  function getInitialCardCount() {
    if (window.innerWidth >= MAX_WIDTH) {
      return INIT_PORTION_MAX;
    } else if (window.innerWidth >= MIDDLE_WIDTH) {
      return INIT_PORTION_MIDDLE;
    } else {
      return INIT_PORTION_MIN;
    }
  };

  function setNextPortion() {
    const delta = 
      props.cards.length - cards.length > cardsInPortion 
      ? cardsInPortion 
      : props.cards.length - cards.length;

    setCards(props.cards.slice(0, cards.length + delta));
    setIsNewSearch(false);
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