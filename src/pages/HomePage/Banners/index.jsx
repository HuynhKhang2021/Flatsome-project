import { Row, Col } from "antd";
import React from "react";

import * as S from "./styles";

const Banners = () => {
  
  return (
    <S.BannersContainer className="banner">
      <Row>
        <Col span={24} lg={{ span: 8 }}>
          <S.SectionsChild>
            <img
              src="https://solve.flatelements.com/wp-content/uploads/2019/04/cart.png"
              alt=""
              style={{ width: "50px" }}
            />
            <S.SectionsTitle>Priority Shipping</S.SectionsTitle>
            <S.SectionsText>
              Not sure if you know this But when we first met I got so nervous
            </S.SectionsText>
          </S.SectionsChild>
        </Col>
        <Col span={24} lg={{ span: 8 }}>
          <S.SectionsChild>
            <img
              src="https://solve.flatelements.com/wp-content/uploads/2019/04/return.png"
              alt=""
              style={{ width: "50px" }}
            />
            <S.SectionsTitle>Fuss Free Returns</S.SectionsTitle>
            <S.SectionsText>
              Not sure if you know this But when we first met I got so nervous
            </S.SectionsText>
          </S.SectionsChild>
        </Col>
        <Col span={24} lg={{ span: 8 }}>
          <S.SectionsChild style={{ borderRight: "none" }}>
            <img
              src="https://solve.flatelements.com/wp-content/uploads/2019/04/living-room.png"
              alt=""
              style={{ width: "50px" }}
            />
            <S.SectionsTitle>In-home Setup</S.SectionsTitle>
            <S.SectionsText>
              Not sure if you know this But when we first met I got so nervous
            </S.SectionsText>
          </S.SectionsChild>
        </Col>
      </Row>
      <Row className="banner-fill">
        <Col span={24} lg={{ span: 8 }}>
          <S.FillContent>
            <S.FillImage
              className="banner-fill__image "
              style={{
                backgroundImage:
                  "url(https://flatsometutorial.com/wp-content/uploads/2020/03/product-10.jpg)",
              }}
            ></S.FillImage>
            <S.FillOverlay className="banner-fill__overlay"></S.FillOverlay>
            <S.FillText className="banner-fill__text">
              50% OFF Watches
            </S.FillText>
          </S.FillContent>
        </Col>
        <Col span={24} lg={{ span: 8 }}>
          <S.FillContent>
            <S.FillImage
              className="banner-fill__image "
              style={{
                backgroundImage:
                  "url(https://flatsometutorial.com/wp-content/uploads/2020/03/banner-3.jpg)",
              }}
            ></S.FillImage>
            <S.FillOverlay className="banner-fill__overlay"></S.FillOverlay>
            <S.FillText className="banner-fill__text">
              On Sale Laptops
            </S.FillText>
          </S.FillContent>
        </Col>
        <Col span={24} lg={{ span: 8 }}>
          <S.FillContent>
            <S.FillImage
              className="banner-fill__image "
              style={{
                backgroundImage:
                  "url(https://flatsometutorial.com/wp-content/uploads/2020/03/hero-1-1024x306.jpg)",
              }}
            ></S.FillImage>
            <S.FillOverlay className="banner-fill__overlay"></S.FillOverlay>
            <S.FillText className="banner-fill__text">
              New Headphones
            </S.FillText>
          </S.FillContent>
        </Col>
      </Row>
    </S.BannersContainer>
  );
};

export default Banners;
