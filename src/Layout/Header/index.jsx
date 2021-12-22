import React from "react";
// import '../fonts/fontawesome-free-5.15.3-web/css/all.min.css'
import * as S from "./styles";
const Header = () => {
  return (
    <S.Header>
      <S.HeaderContainer className="header">
        <S.HeaderText className="header-text mr-auto">
          USE THE CODE DARREL10 AT CHECKOUT FOR 10% OFF! 3 DAYS ONLY!
        </S.HeaderText>
        <S.HeaderLink className="header-link">
          <a href="" className="header-link_text">
            Assign a menu in Theme Options &#62; Menus
          </a>
          <a href="https://www.facebook.com/profile.php?id=100041674654850">
            {" "}
            <i class="facebook fab fa-facebook"></i>
          </a>
          <a href="">
            {" "}
            <i class="instagram fab fa-instagram-square"></i>
          </a>
          <a href="">
            {" "}
            <i class="tiktok fab fa-tiktok"></i>
          </a>
          <a href="">
            {" "}
            <i class="twitter fab fa-twitter"></i>
          </a>
          <a href="">
            {" "}
            <i class="envelope far fa-envelope"></i>
          </a>
          <a href="">
            {" "}
            <i class="pinterest fab fa-pinterest"></i>
          </a>
          <a href="https://www.youtube.com/watch?v=Hjto35ir490">
            {" "}
            <i class="youtube fab fa-youtube"></i>
          </a>
        </S.HeaderLink>
      </S.HeaderContainer>
    </S.Header>
  );
};

export default Header;
