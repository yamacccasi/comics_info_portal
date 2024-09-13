import React from 'react';
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {useState} from "react";
import decoration from '../../resources/img/vision.png';
import RandomChar from "../randomChar/RandomChar";

const MainPage = () => {

    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharSelected = (id) => {
        setSelectedCharacter(id)
    }

    return (
  <>
      <ErrorBoundary>
          <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
          <ErrorBoundary>
              <CharList onCharSelected={onCharSelected}/>
          </ErrorBoundary>
          <ErrorBoundary>
              <CharInfo charId={selectedCharacter}/>
          </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
  </>
    )
}

export default MainPage