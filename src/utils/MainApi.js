export const BASE_URL = 'https://api.tyvmovies.nomoredomains.club';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Ошибка на сервере')
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'mode': 'no-cors'
    },
    body: JSON.stringify({name, password, email})
  })
  .then(checkResponse);  
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'mode': 'no-cors'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse);
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(checkResponse);
};

export const updateUserInfo = (data, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email
    })
  })
  .then(checkResponse);
};

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // 'mode': 'no-cors'
      },
  })
  .then(checkResponse);
};

export const deleteMovie = (id, token) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
  })
  .then(checkResponse);
};

export const addMovie = (data, token) => {
  return fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
      }),
  })
  .then(checkResponse);
};

export const changeLikeCardStatus = (id, isLiked, token) => {
  return fetch(`${BASE_URL}/movies/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
  })
  .then(checkResponse);
}  
