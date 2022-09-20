import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener(
  'input',
  debounce((event) => {
    let nameInput = event.target.value;
    clearPage();
    if (nameInput.length === 0) {
      return;
    }
  
    fetchCountries(nameInput.trim())
      .then(countries => makeCountriesList(countries))
      .catch(error => Notify.failure('Oops, there is no country with that name'));
  }, DEBOUNCE_DELAY)
);

function clearPage() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
} 
function makeCountriesList(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  makeCountriesInfo(countries);
}
function currentLanguages(languages) {
  const langs = [];
  for (let key in languages) {
    langs.push(languages[key]);
  }
  return langs;
}
function makeCountriesInfo(countries) {
  if (countries.length === 1) {
    countriesCard(countries);
  } else {
    countriesList(countries);
  }
}
function countriesList(countries) {
  const elementList = countries
    .map(country => {
      return `<li class="country-list-item">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="50">
          <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = elementList;
}
function countriesCard(countries) {
  const card = countries
    .map(country => {
      const languages = currentLanguages(country.languages);
      return `<div class="country-item">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="250">
          <p><b>Name</b>: ${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Languages</b>: ${languages}</p>
          <p><b>Population</b>: ${country.population}</p>
        </div>`;
    })
    .join('');
  countryInfo.innerHTML = card;
}