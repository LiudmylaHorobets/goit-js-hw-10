import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const BREEDS_URL = '/breeds';
const IMAGES_URL = '/images/search';
const API_KEY =
  'live_AInBiZNMGTspPJow6eVuTFhnUUqlCCv9K3ia4eMvA7myxAvI8V3zJkjb4kF1xzmt';

axios.defaults.headers.common['x-api-key'] =
  'live_NWEy6xxwLGvFpS0aqUewOl5VMamxgNKtUChLGZX6T3mgkKvBlzqLkOd3CbEfq6Bv';

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}${BREEDS_URL}`, {
      params: {
        api_key: API_KEY,
      },
    })
    .then(resp => {
      if (!resp.data) {
        throw new Error('No data received');
      }
      return resp.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${IMAGES_URL}`, {
      params: {
        api_key: API_KEY,
        breed_ids: breedId,
      },
    })
    .then(resp => {
      if (!resp.data) {
        throw new Error('No data received');
      }
      return resp.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

// ===============================================
// const BASE_URL = 'https://api.thecatapi.com/v1';
// const BREEDS_URL = '/breeds?api_key=';
// const IMAGES_URL = '/images/search?api_key=';
// const API_KEY =
//   'live_AInBiZNMGTspPJow6eVuTFhnUUqlCCv9K3ia4eMvA7myxAvI8V3zJkjb4kF1xzmt';


// export function fetchBreeds() {
//   return fetch(`${BASE_URL}${BREEDS_URL}${API_KEY}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }
//     return resp.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   const params = new URLSearchParams({
//     breed_ids: breedId,
//   });
//   return fetch(`${BASE_URL}${IMAGES_URL}${API_KEY}&${params}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }
//     return resp.json();
//   });
// }