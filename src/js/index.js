import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] = 'live_flQsdmawXVHOEszZKd0VDFO3Nlsnte0OFf9SJwDCYz8Cq2lt0EpZwPMk51cGmD3e';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1'

const breedSelector = document.querySelector('.breed-select')
const container = document.querySelector('.cat-info')
const loader = document.querySelector('.loader')
const error = document.querySelector('.error')

breedSelector.addEventListener('input', onBreedChoose)

const createMarkup = breed =>`<option value="${breed.id}">${breed.name}</option>`;

fetchBreeds()
.then(resp => {breedSelector.hidden =false; error.hidden = true; resp.map(breed => 
breedSelector.insertAdjacentHTML('beforeend', createMarkup(breed)))})
.catch(()=>{breedSelector.hidden = true;
    loader.hidden = true;
    error.hidden = false})


function onBreedChoose(){container.innerHTML = '';
error.hidden = true
    loader.hidden = false;
    const breedId = breedSelector.value
    fetchCatByBreed(breedId)
    .then(resp => {loader.hidden = true;
        const cat = resp[0].breeds[0]
        container.innerHTML = 
        `<div class="img-wrp"><img src="${resp[0].url}" alt="${cat.name}" ></div>
        <div class="description">
        <h2>${cat.name}</h2>
        <p>${cat.description}</p>
        <span>Temperament:</span><p>${cat.temperament}</p>
        </div>`;
        })
       
        .catch(()=>{loader.hidden = true; error.hidden = false})
   
}
export {loader, error}

