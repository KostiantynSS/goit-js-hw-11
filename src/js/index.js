import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')

form.addEventListener('submit', onSubmit)
loadMoreBtn.addEventListener('click', handleLoadMoreBtn)
let currentPage = 1;

const searchParams = new URLSearchParams({
  key:'38665853-fe99969bd23bb921fc896ab74',
  image_type: 'photo',
  orientation:'horizontal',
  safesearch: true,
per_page: 40, 
page: currentPage
});
  axios.defaults.baseURL = 
  `https://pixabay.com/api/?`;

async function onSubmit(e) { 
  gallery.innerHTML= ''
  e.preventDefault()
  const searchRequest = form.elements[0].value.trim()
  if(searchRequest)
{searchParams.set('q', `${searchRequest}`)}
axiosPhotos()
  
  }
function createMarkup({webformatURL, tags, likes, views, comments, downloads}){
  return `<div class="photo-card">
<a><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
<div class="info">
  <p class="info-item">
    <b>Likes </b>
    <b>${likes}</b>
  </p>
  <p class="info-item">
    <b>Views </b>
    <b>${views}</b>
  </p>
  <p class="info-item">
    <b>Comments </b>
    <b>${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads </b>
    <b>${downloads}</b>
  </p>
</div>
</div>`}
function handleLoadMoreBtn(){
  currentPage +=1;
  searchParams.set('page', currentPage)
 axiosPhotos()

}



 
    async function axiosPhotos(){await axios('',{params:searchParams})
    .then(resp => {
      
      totalPages = Math.ceil(resp.data.total / searchParams.get('per_page'));
      totalPages <= 1 || totalPages === currentPage ? loadMoreBtn.hidden = true: loadMoreBtn.hidden = false
     
      const photoArr = resp.data.hits;
  if(photoArr.length === 0){Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again')}
  if (totalPages === currentPage){Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")}
      photoArr.map(result => 
        gallery.insertAdjacentHTML('beforeend', createMarkup(result)) )
      }).catch(err => console.log(err))}
