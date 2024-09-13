import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
    const {loading,error,cleanError,getAllComics} = useMarvelService();

    const [comicList, setComicList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest(offset,true)
    }, []);


    const onRequest = (offset,initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true;
        }
        setComicList(comicList=> [...comicList, ...newComicsList]);
        setNewItemLoading(false)
        setOffset(offset + 8)
        setComicsEnded(ended)
    }

    const renderComics = (arr) => {

        const comics = arr.map((item,i) => {
            const {id,title,price,thumbnail,link} = item
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    const items = renderComics(comicList);

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
        <button className="button button__main button__long"
        onClick={() => {onRequest(offset)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;