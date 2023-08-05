import axios from 'axios';


const searchParams = new URLSearchParams({
  key:'38665853-fe99969bd23bb921fc896ab74',
  image_type: 'photo',
  orientation:'horizontal',
  safesearch: true,
per_page: 40, 
page: 1});
  axios.defaults.baseURL = 
  `https://pixabay.com/api/?`

const form = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
form.addEventListener('submit', onSubmit)

function onSubmit(e) { 
  e.preventDefault()
const searchRequest = form.elements[0].value
  if(searchRequest)
{searchParams.set('q', `${searchRequest}`)}
  axios('',{params:searchParams}).then(resp => {
    const photoArr = resp.data.hits;
    photoArr.map(result => gallery.insertAdjacentHTML('beforeend', createMarkup(result)) )
    console.log(photoArr)})
  }
function createMarkup(result){return `<div class="photo-card">
<img src="${result.webformatURL}" alt="${result.tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes </b>
    <b>${result.likes}</b>
  </p>
  <p class="info-item">
    <b>Views </b>
    <b>${result.views}</b>
  </p>
  <p class="info-item">
    <b>Comments </b>
    <b>${result.comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads </b>
    <b>${result.downloads}</b>
  </p>
</div>
</div>`}
