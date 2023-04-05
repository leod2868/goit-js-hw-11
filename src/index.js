import './sass/index.scss';
import { renderGallery } from './rendergallery';
import Notiflix from 'notiflix';





const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}
const perPage = 40;


refs.searchForm.addEventListener('submit', onSearch)



function onSearch(e) {
    e.preventDefault();
    query = e.currentTarget.elements.searchQuery.value.trim();
    const KEY = '35072651-5af9f921021a18d865de9bf46';
          
    const url = 
 `https://pixabay.com/api/?key=${KEY}&q={query}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page={perPage}`

    fetch(url).then(r => r.json()).then(console.log)
    
}
