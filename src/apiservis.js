import axios from "axios";
export { ApiService };

class ApiService {

    constructor() {
        this.query = '';
        this.page = 1;
    }

     fetchImages() {
        const perPage = 40; 
        const KEY = '35072651-5af9f921021a18d865de9bf46';
        const url =
            `https://pixabay.com/api/?key=${KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${perPage}`

       return fetch(url)
             .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
            .then((data) => {
                this.incrementPage() 
                return data
            })
    }

    incrementPage() {
        this.page += 1;  
    }

    resetPage() {
        this.page = 1; 
    }


    get meaning() {
        return this.query
    };

    set meaning(newQuery) {
      this.query = newQuery  
    };
        






}

