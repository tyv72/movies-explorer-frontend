import './MoviesCardList.css';
import MoviesCard from './../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {
  return (
    <section className="card-gallery">   
      {props.cards.map((card, i) => (
        <MoviesCard key={card._id} card={card}/>
      ))}                     
    </section>
  );
}

export default MoviesCardList;