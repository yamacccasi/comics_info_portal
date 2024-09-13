import {useHttp} from "../hooks/http.hook";

const useMarvelService  = () => {
    const {loading,error,cleanError,request} = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = '?apikey=35184d6c2169fa4afb43d4ec486bd3cb\n'
    const _baseOffset = 210;

   const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=35184d6c2169fa4afb43d4ec486bd3cb`);
        return res.data.results.map(_transformCharacter)
        // const res = await this.getResource(`${this._apiBase}characters${this._apiKey}`);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (id) => {
       const res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=35184d6c2169fa4afb43d4ec486bd3cb
`);
       return _transformComics(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
       const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=35184d6c2169fa4afb43d4ec486bd3cb\n`)
        return res.data.results.map(_transformComics)
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Sorry, description has been lost somewhere in the UNIVERSE',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
        const _transformComics = (comics) => {
            return {
                link: comics.urls[0].url,
                id: comics.id,
                title: comics.title,
                description: comics.description || "There is no description",
                pageCount: comics.pageCount
                    ? `${comics.pageCount} p.`
                    : "No information about the number of pages",
                thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
                language: comics.textObjects[0]?.language || "en-us",
                // optional chaining operator
                price: comics.prices[0].price
                    ? `${comics.prices[0].price}$`
                    : "not available",
            }

    }
    return {loading,error,getAllCharacters,getCharacter,cleanError,getAllComics,getComics}
 }

 export default useMarvelService;