import './css/styles.css';
import { ApiService } from './apiservis';
import Notiflix from 'notiflix';



const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}
const perPage = 40;

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadmore)

const apiService = new ApiService()

function onSearch(e) {
    e.preventDefault();
    
    apiService.meaning = e.currentTarget.elements.searchQuery.value.trim();
    refs.gallery.innerHTML = '';
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
             
            if (data.totalHits > perPage) {
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




function renderGallery(images) {

    const markup = images.map(image => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
        return `

            <div class="photo-card">
                <a href="${largeImageURL}">
                     <img  class="gallery__image img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                     <div class="info">
                         <p class="info-item"><b>Likes</b>${likes}</p>
                         <p class="info-item"><b>Views</b>${views}</p>
                         <p class="info-item"><b>Comments</b>${comments}</p>
                         <p class="info-item"><b>Downloads</b>${downloads} </p>
                    </div>
                </a>  
           </div>
          `
    }).join('');
   
   refs.gallery.insertAdjacentHTML('beforeend', markup);

}


