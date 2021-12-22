import React from "react";
import * as S from './styles'

const NewLetters = () => {
  
  return (
    <S.LettersContainer
      className="letters"
      style={{
        backgroundImage:
          "url(https://flatsometutorial.com/wp-content/uploads/2020/03/image-11-of-12.jpg)",
      }}
    >
      <S.LettersOverlay className="letters-overlay">
        <S.LettersContent className="letters-content">
          <h1 style={{fontWeight: 700, color:'#f1f1f1'}} className="letters-heading">NEWSLETTER</h1>
          <p className="letters-desc" style={{fontSize:'1rem', color:'#f1f1f1'}}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </p>
          <h3 className="letters-email" style={{fontWeight: 700, color:'#f1f1f1'}}>Your email</h3>
          <input className="letters-input" style={{width: '100%'}}></input>
          <button className="letters-btn btn-dark" style={{marginTop: '1rem'}}>SUBSCRIBE</button>
        </S.LettersContent>
      </S.LettersOverlay>
    </S.LettersContainer>
  );
};

export default NewLetters;
