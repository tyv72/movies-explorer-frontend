import './App.css';

import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as moviesApi from '../../utils/MoviesApi.js';
import * as mainApi from '../../utils/MainApi.js';

import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({name:'', email:'', _id:''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);     
  const [isSearchError, setIsSearchError] = React.useState(false);
  const history = useHistory();
  
  React.useEffect(() => {
    handleTokenCheck();  
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn, history]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){      
      mainApi.checkToken(jwt)
        .then((res) => {
          if (res){
            fillState(jwt);                                
          }
        })
        .catch((err) => console.log(err)); 
    }
  }

  function fillState(token) {
    mainApi.getUserInfo(token)
      .then((userData) => {
        setCurrentUser(userData.data); 
        // Восстанавливаем из ЛС, если в текущей сессии обновили экран
        const storedMovies = JSON.parse(localStorage.getItem('movies'));
        setMovies(storedMovies ? storedMovies : []);
        setSavedMovies(storedMovies ? storedMovies.filter((movie) => movie.saved) : []);
        setLoggedIn(true);                                     
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(data) {
    const {name, password, email} = data;
    return mainApi.register(name, email, password)
      .then((res) => {      
        if(!res || res.statusCode === 400){
          throw new Error('Ошибка при регистрации');
        }
        return mainApi.authorize(password, email);           
      })
      .then((res) => {
        if(!res || res.statusCode === 400){
          throw new Error('Ошибка при авторизации');
        } 
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          fillState(res.token);                
        }  
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin (data){
    const {password, email} = data;
    return mainApi.authorize(password, email)
      .then((res) => {
        if(!res || res.statusCode === 400){
          throw new Error('Ошибка при авторизации');
        } 
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          fillState(res.token);                
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogout () {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    setLoggedIn(false);
    setMovies([]);
    setSavedMovies([]);
  }

  function handleUpdateUser (data) {
    const token = localStorage.getItem('jwt');
    mainApi
      .updateUserInfo(data, token)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => console.log(err));
  }

  const handleSearch = (checked, searchWord) => {
    setLoading(true);
    setIsSearchError(false);
    const token = localStorage.getItem('jwt');

    // При поиске сразу обновляем информацию и о сохраненных фильмах
    return Promise.all([moviesApi.getAllMovies(), mainApi.getMovies(token)])
      .then(([allMovies, savedMoviesData]) => {    
        // Достаем сохраненные только по текущему пользователю    
        const receivedMovies = savedMoviesData.data
          .filter((movie) => movie.owner === currentUser._id)
          .map((movie) => Object.assign(movie, {saved: true}));        
    
        if (allMovies) {
          // Поиск только по названиям фильмов
          const filteredMovies = allMovies
            .filter((movie) => {
              const includeMovie = checked ? movie.duration <= 40 : true;
              const containRU = movie.nameRU && movie.nameRU.toLowerCase().includes(searchWord.toLowerCase());
              const containEN = movie.nameEN && movie.nameEN.toLowerCase().includes(searchWord.toLowerCase());
              return includeMovie && (containRU || containEN);
            }).map((movie) => {
              const newMovie = {
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailer: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                movieId: movie.id,
              };
              // Устанавливаем все атрибуты для сохраненных фильмов
              const saved = receivedMovies.find(receivedMovie => receivedMovie.movieId == movie.id);
              if (saved) {
                newMovie.saved = true;
                newMovie._id = saved._id;
                newMovie.owner = saved.owner;
              } else {
                newMovie.saved = false;
              }
              
              return newMovie;
            });      
          localStorage.setItem("movies", JSON.stringify(filteredMovies));
          setMovies(filteredMovies);          
        } else {
          setMovies([]);
        }
        setSavedMovies(receivedMovies);
        setLoading(false);
      })
      .catch((err) => {
        setIsSearchError(true);
        setLoading(false);
        console.log(err);
      });
  }

  // Вызывается при открытии формы с сохраненными фильмами
  function handleOpenSavedMovies(movies) {
    setSavedMovies(movies);                                      
  }

  // Вызывается при клике на кнопку сохранения/удаления на карточке фильма
  const toggleLikeMovie = (movieCard) => {
    const token = localStorage.getItem('jwt');
    
    // Если до клика фильм был сохранен
    if (movieCard.saved) {
      return mainApi.deleteMovie(movieCard._id, token)
      .then(() => {
        // в общем списке фильмов обновляем признак того, что фильм удален из сохраненных
        const newMovies = movies.map((item) => {
          if (item._id && item._id === movieCard._id) {
            item.saved = false;
          } 
          return item;
        });
        setMovies(newMovies);
        localStorage.setItem("movies", JSON.stringify(newMovies));
        // из списка сохраненных фильмов удаляем фильм
        let updatedMovies = savedMovies.slice();
        let movieIdx = updatedMovies.findIndex(item => item._id === movieCard._id);
        updatedMovies.splice(movieIdx, 1);
        setSavedMovies(updatedMovies);
      })
      .catch((err) => console.log(err));
    } else {
      // иначе сохраняем фильм в БД
      return mainApi.addMovie(movieCard, token)
      .then((newMovie) => {
        // обновляем признак того, что фильм сохранен, в общем списке фильмов
        const newMovies = movies.map((item) => {
          if (item.movieId === movieCard.movieId) {
            item.saved = true;
            item._id = newMovie.data._id;
            item.owner = newMovie.data.owner;
          } 
          return item;
        });
        setMovies(newMovies);
        localStorage.setItem("movies", JSON.stringify(newMovies));
        // добавляем фильм в список сохраненных
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
    }      
  } 

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}> 
        <Switch>
          <Route path='/signup'>
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path='/signin'>
            <Login handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute path='/profile' loggedIn={loggedIn}>
            <Header background_color='dark' loggedIn={loggedIn} />
            <Profile onUpdateUser={handleUpdateUser} handleLogout={handleLogout}/>
          </ProtectedRoute>
          <ProtectedRoute path='/movies' loggedIn={loggedIn}>
            <Header background_color='dark' loggedIn={loggedIn}/>            
            <Movies 
              movies={movies}
              isLoading={loading}
              isSearchError={isSearchError}
              onSearch={handleSearch}
              onToggleMovie={toggleLikeMovie}
              />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
            <Header background_color='dark' loggedIn={loggedIn} />              
            <SavedMovies 
              onOpen={handleOpenSavedMovies}
              onToggleMovie={toggleLikeMovie}
            />
            <Footer />
          </ProtectedRoute>
          <Route exact path='/'>
            <Header background_color='blue' loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>      
    </div>
  );
}

export default App;
