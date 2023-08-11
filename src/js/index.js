
import Notiflix from 'notiflix';
import { axiosPhotos, searchParams } from './api.js';

const form = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')

form.addEventListener('submit', onSubmit)
loadMoreBtn.addEventListener('click', handleLoadMoreBtn)

let totalPages;

 async function onSubmit(e) { 
   e.preventDefault()
  currentPage = 1;
  searchParams.set('page', currentPage)
  gallery.innerHTML= ''
  const searchRequest = form.elements[0].value.trim()
  if(searchRequest)
{searchParams.set('q', `${searchRequest}`)}
const{totalHits, hits}= await axiosPhotos()
  totalPages = Math.ceil(totalHits / searchParams.get('per_page'));
  totalPages <= 1 || totalPages === currentPage ? loadMoreBtn.hidden = true: loadMoreBtn.hidden = false;

if(hits.length === 0){Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again')}
if (totalPages === currentPage){Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")}
  hits.map(result => 
    gallery.insertAdjacentHTML('beforeend', createMarkup(result)) )
  
  
  }


async function handleLoadMoreBtn(){
  currentPage +=1;
  searchParams.set('page', currentPage)

 const{totalHits, hits}= await axiosPhotos()
  totalPages = Math.ceil(totalHits / searchParams.get('per_page'));
  totalPages <= 1 || totalPages === currentPage ? loadMoreBtn.hidden = true: loadMoreBtn.hidden = false;

if(hits.length === 0){Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again')}
if (totalPages === currentPage){Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")}
  hits.map(result => 
    gallery.insertAdjacentHTML('beforeend', createMarkup(result)) )
  

}
      function createMarkup({largeImageURL, webformatURL, tags, likes, views, comments, downloads}){
        return `<div class="photo-card"
      <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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