import './css/styles.css';
import { renderGallery } from './rendergallery';
import { ApiService } from './apiservis';
import Notiflix from 'notiflix';



const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}
const perPage = 40;
// let query =''

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadmore)

const apiService = new ApiService()

function onSearch(e) {
    e.preventDefault();
    apiService.meaning = e.currentTarget.elements.searchQuery.value.trim();
    onClean();
    apiService.resetPage()
    refs.loadMoreBtn.classList.add('is-hidden');
    if (apiService.meaning === '') {
        Notiflix.Notify.failure('Enter something normal')  
        return;
    }
    
    apiService.fetchImages().then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.') 
        } else {
            renderGallery(hits);
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
             
            if (totalHits > perPage) {
              refs.loadMoreBtn.classList.remove('is-hidden')   
            }
        }
    }).catch(error => console.log(error)).finally(() => {
        refs.searchForm.reset();
        
    })
}



function onLoadmore() {
    apiService.fetchImages().then(({ hits, totalHits }) => {
        renderGallery(hits);
        const totalPages = Math.ceil(totalHits / perPage);
        if (page > totalPages) {
            refs.loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
        }
    }).catch(error => console.log(error))
}




function onClean() {
    refs.gallery.innerHTML = '';
}
