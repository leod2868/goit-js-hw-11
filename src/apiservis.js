export default class ApiService {

    fetchImages() {
        const KEY = '35072651-5af9f921021a18d865de9bf46';
          
        const url =
            `https://pixabay.com/api/?key=${KEY}&q={query}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=${perPage}`

        fetch(url).then(r => r.json()).then(console.log)
    
    }

}