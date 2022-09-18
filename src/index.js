import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');