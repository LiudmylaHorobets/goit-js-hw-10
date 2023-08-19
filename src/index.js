import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import './styles.css';

const ref = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfoEl: document.querySelector('.cat-info'),
};

ref.selectEl.classList.add('is-hidden');
ref.loaderEl.textContent = '';
ref.errorEl.classList.add('is-hidden');
ref.catInfoEl.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    ref.selectEl.innerHTML = createMarkup(data);
    slimSelect();
    ref.selectEl.classList.remove('is-hidden');
    ref.loaderEl.classList.add('is-hidden');
  })
  .catch(fetchError);

ref.selectEl.addEventListener('change', getBreed);

// function getBreed(event) {
//   ref.selectEl.classList.add('is-hidden');
//   ref.loaderEl.classList.replace('is-hidden', 'loader');
//   ref.catInfoEl.classList.add('is-hidden');

//   const breedId = event.currentTarget.value;

//   fetchCatByBreed(breedId)
//     .then(data => {
//       ref.selectEl.classList.remove('is-hidden');
//       ref.loaderEl.classList.replace('loader', 'is-hidden');

//       createMarkupCard(data);

//       ref.catInfoEl.classList.remove('is-hidden');
//     })
//     .catch(fetchError);
// }

// виправлений код ====================

function getBreed(event) {
  ref.selectEl.classList.add('is-hidden');
  ref.loaderEl.classList.remove('is-hidden');
  ref.catInfoEl.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      ref.selectEl.classList.remove('is-hidden');
      ref.loaderEl.classList.add('is-hidden');

      if (data.length === 0) {
        ref.catInfoEl.innerHTML =
          'There is no data for this breed, try another one';
        // ref.catInfoEl.classList.add('is-hidden');
        return;
      }

      createMarkupCard(data);

      ref.catInfoEl.classList.remove('is-hidden');
    })
    .catch(() => {
      ref.loaderEl.classList.add('is-hidden');
      fetchError();
    });
}
function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
function createMarkupCard(data) {
  const cardCat = data
    .map(el => {
      const { url, breeds } = el;
      const { name, description, temperament } = breeds[0];

      return `
    <img src="${url}" alt="${name}" width="500" height="100%" />
    <div class="text-wrap">
      <h1 class="title">${name}</h1>
      <p class="description">${description}</p>
      <h2>Temperament:</h2>
      <p class="description">${temperament}</p>
    </div>`;
    })
    .join('');
  ref.catInfoEl.innerHTML = cardCat;
}

function slimSelect() {
  new SlimSelect({
    select: ref.selectEl,
  });
}

function fetchError() {
  ref.selectEl.classList.remove('is-hidden');
  ref.loaderEl.classList.replace('loader', 'is-hidden');

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 1000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
