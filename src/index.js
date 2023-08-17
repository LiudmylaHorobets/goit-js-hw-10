import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');

