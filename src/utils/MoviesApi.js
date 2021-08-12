const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Ошибка на сервере')
};

export const getAllMovies = () => {
    return fetch(BASE_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(checkResponse);
};