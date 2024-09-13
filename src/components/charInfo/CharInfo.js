import './charInfo.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import {useState,useEffect} from "react";
import useMarvelService from "../../services/MarvelService";
import {PropTypes} from "prop-types";

const CharInfo = (props) => {
    const {loading,error,getCharacter,cleanError} = useMarvelService();

    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar()
    },[props.charId])

   const updateChar = () => {
        const {charId} = props
        if(!charId) {
            return
        }
        cleanError()
        getCharacter(charId)
            .then(onCharLoaded)
        // this.foo.bar = 0; // error log, тільки на dev збірці
    }

    const onCharLoaded = (char) => {
        setChar(char)

    }

        const skeleton = char || loading || error ? null  : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>)

}

    const View = ({char}) => {
    const {name, description,thumbnail,homepage,wiki,comics} = char;

        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }

        return (<><div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div> <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length > 0 ? null : 'Sorry, there are no any comics with this character'}
            {
                comics.map((item,i)=> {
                    if (i>9) {
                        return
                    }
                    return (
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    )
                })
            }

        </ul>
        </>)
    }

    CharInfo.propTypes = {
    charId: PropTypes.string

    }

export default CharInfo;