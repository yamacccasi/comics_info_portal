import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = () =>  {
    const [char, setChar] = useState(null);
    const {loading,error, getCharacter,cleanError} = useMarvelService();

    useEffect(()=> {
        updateChar()
    }, [])

   const onCharLoaded = (char) => {
        setChar(char);
    }

      const  updateChar = () => {
            cleanError()
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000) // створюємо рандомний id для запиту;
            getCharacter(id).then(onCharLoaded) // робимо запит по згенерованому id, після чого відповідь прокидуєм через функцію CharLoaded
    }

        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null

       return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={updateChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({char}) => {
    const {name,description,thumbnail,homepage,wiki} = char;

        return (  <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>)

}

export default RandomChar;