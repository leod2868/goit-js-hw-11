import './css/styles.css';
import { renderGallery } from './rendergallery';
import Notiflix from 'notiflix';
import ApiService from './apiservis';




const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}
const perPage = 40;
let query = '';

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadmore)

const apiService = new ApiService()

function onSearch(e) {
    e.preventDefault();
    query = e.currentTarget.elements.searchQuery.value.trim();
    apiService.fetchImages(query)
}

function onLoadmore() {
   apiService.fetchImages(query)  

 }