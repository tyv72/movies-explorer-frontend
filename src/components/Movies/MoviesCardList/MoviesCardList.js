import './MoviesCardList.css';
import MoviesCard from './../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {
  return (
    <>
      <section className="card-gallery">   
        {props.cards.map((card, i) => (
          <MoviesCard key={card._id} card={card} saved={props.saved}/>
        ))}                             
      </section>
      {props.cards.length > 3 && <button className="card-gallery__more">
        Ещё
      </button>}
    </>    
  );
}

export default MoviesCardList;