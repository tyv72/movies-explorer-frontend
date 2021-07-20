import './App.css';

import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

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

  // Способ перерисовать компонент, если выяснилось, что 
  // пользователь авторизован. 

  // Проблема в том, что ProtectedRoute отрисовывается до исполнения хука с проверкой токена,
  // и как следствие, установка loggedIn в true производится уже после того, как
  // пользователя редиректнули на /. Обходной путь заключается в запоминании
  // в истории родоначальной ссылки, которая была в ProtectedRoute, и в случае успешной проверки
  // токена пользователь редиректится обратно за запушенную в историю ссылку.
  React.useEffect(() => {
    if (loggedIn) {
      history.goBack();
    } else {
      history.push('/');
    }
  }, [loggedIn]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){   
      mainApi.checkToken(jwt)
        .then((res) => {
          if (res){  
            setLoggedIn(true);
            fillState(jwt);                                          
          }
        })
        .catch((err) => { 
          console.log(err) 
        }); 
    }
  }

  function saveCurrentPath(path) {
    history.push(path);
  }

  function filterMovies(storedMovies, checked, searchWord) {
    return storedMovies
      .filter((movie) => {
        const includeMovie = checked ? movie.duration <= 40 : true;
        const containRU = movie.nameRU && movie.nameRU.toLowerCase().includes(searchWord.toLowerCase());
        const containEN = movie.nameEN && movie.nameEN.toLowerCase().includes(searchWord.toLowerCase());
        return includeMovie && (containRU || containEN);         
      });
  }

  function fillState(token) {
    Promise.all([mainApi.getUserInfo(token), mainApi.getMovies(token)])
      .then(([userData, savedMoviesData]) => { 
        setCurrentUser(userData.data); 

        // Достаем сохраненные только по текущему пользователю
        const storedSavedMovies = savedMoviesData.data
          .filter((movie) => movie.owner === userData.data._id)
          .map((movie) => Object.assign(movie, {saved: true}));
        setSavedMovies(storedSavedMovies);

        // Восстанавливаем из ЛС, если в текущей сессии обновили экран
        let storedMovies = JSON.parse(localStorage.getItem('movies'));
        const storedChecked = 
          localStorage.getItem('checked') ? 
          JSON.parse(localStorage.getItem('checked')) : false;
        const storedSearchWord = 
          localStorage.getItem('searchWord') ? 
          localStorage.getItem('searchWord') : "";
        
        storedMovies = filterMovies(storedMovies, storedChecked, storedSearchWord);

        if (storedMovies) {
          storedMovies
            .map((movie) => {
              // Устанавливаем все атрибуты для сохраненных фильмов
              const saved = storedSavedMovies.find(
                  savedMovie => 
                  savedMovie.movieId == movie.movieId
                );
              if (saved) {
                movie.saved = true;
                movie._id = saved._id;
                movie.owner = saved.owner;
              } else {
                movie.saved = false;
              }
              
              return movie;
            });
            setMovies(storedMovies);
        } else {
          setMovies([]);
        }            
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
          setLoggedIn(true);                
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
          setLoggedIn(true);                
        }
      })
      .catch((err) => { 
        console.log(err) 
      });
  }

  function handleLogout () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setMovies([]);
    setSavedMovies([]);
    history.push('/');
  }

  function handleUpdateUser (data) {
    const token = localStorage.getItem('jwt');
    return mainApi
      .updateUserInfo(data, token)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => console.log(err));
  }

  const handleSearch = (checked, searchWord) => {
    setLoading(true);
    setIsSearchError(false);
    let storedMovies = localStorage.getItem('movies');
    
    if (storedMovies) {
      storedMovies = JSON.parse(localStorage.getItem('movies'));
      // Если поиск уже осуществлялся, то больше по АПИ фильмы не получаем.
      // Но перед употреблением обновляем атрибуты для сохраненных фильмов
      let filteredMovies = storedMovies
        .map((movie) => {
          // Устанавливаем все атрибуты для сохраненных фильмов
          const saved = savedMovies.find(savedMovie => savedMovie.movieId == movie.movieId);
          if (saved) {
            movie.saved = true;
            movie._id = saved._id;
            movie.owner = saved.owner;
          } else {
            movie.saved = false;
          }
          
          return movie;
        });
      localStorage.setItem("movies", JSON.stringify(filteredMovies));
      localStorage.setItem("checked", checked);
      localStorage.setItem("searchWord", searchWord);

      filteredMovies = filterMovies(filteredMovies, checked, searchWord);        
      setMovies(filteredMovies);
      setLoading(false);
    } else {      
      const token = localStorage.getItem('jwt');

      // При поиске сразу обновляем информацию и о сохраненных фильмах
      Promise.all([moviesApi.getAllMovies(), mainApi.getMovies(token)])
      .then(([allMovies, savedMoviesData]) => {    
        // Достаем сохраненные только по текущему пользователю    
        const receivedMovies = savedMoviesData.data
          .filter((movie) => movie.owner === currentUser._id)
          .map((movie) => Object.assign(movie, {saved: true}));        
    
        if (allMovies) {
          let filteredMovies = allMovies
            .map((movie) => {
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
          localStorage.setItem("checked", checked);
          localStorage.setItem("searchWord", searchWord);

          // Поиск только по названиям фильмов
          filteredMovies = filterMovies(filteredMovies, checked, searchWord); 
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
        const updatedMovies = [...movies].map((item) => {
          if (item._id && item._id === movieCard._id) {
            item.saved = false;
          } 
          return item;
        });
        setMovies(updatedMovies);
        
        let updatedSavedMovies = [...savedMovies].filter(item => item._id !== movieCard._id);
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => console.log(err));
    } else {
      // иначе сохраняем фильм в БД
      return mainApi.addMovie(movieCard, token)
      .then((newMovie) => {
        // обновляем признак того, что фильм сохранен, в общем списке фильмов
        const updatedMovies = [...movies].map((item) => {
          if (item.movieId == newMovie.data.movieId) {
            item.saved = true;
            item._id = newMovie.data._id;
            item.owner = newMovie.data.owner;
          } 
          return item;
        });
        setMovies(updatedMovies);
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
            {!loggedIn ? <Register onRegister={handleRegister} /> : <Redirect to="./" /> }
          </Route>
          <Route path='/signin'>
            {!loggedIn ? <Login handleLogin={handleLogin} /> : <Redirect to="./" /> }            
          </Route>
          <ProtectedRoute path='/profile' loggedIn={loggedIn} savePath={saveCurrentPath}>
            <Header background_color='dark' loggedIn={loggedIn} />
            <Profile onUpdateUser={handleUpdateUser} handleLogout={handleLogout}/>
          </ProtectedRoute>
          <ProtectedRoute path='/movies' loggedIn={loggedIn} savePath={saveCurrentPath}>
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
          <ProtectedRoute path='/saved-movies' loggedIn={loggedIn} savePath={saveCurrentPath}>
            <Header background_color='dark' loggedIn={loggedIn} />              
            <SavedMovies 
              movies={savedMovies}
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
