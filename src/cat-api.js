
import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

axios.defaults.headers.common['x-api-key'] =
  'live_NWEy6xxwLGvFpS0aqUewOl5VMamxgNKtUChLGZX6T3mgkKvBlzqLkOd3CbEfq6Bv';

export function fetchBreeds() {
  return axios.get(BASE_URL).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}
