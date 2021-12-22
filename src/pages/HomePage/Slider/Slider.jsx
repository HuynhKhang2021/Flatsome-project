import React from "react";
import { Row, Col } from "antd";
import * as S from "./styles";
const Slider = () => {
  return (
    <S.Slider>
      <S.SliderContainer>
        <Row>
          <Col span={24} lg={{ span: 10 }}>
            <S.SliderContent>
              <h6
                // className="small-title"
                style={{
                  color: "#b4b3b3",
                  fontSize: ".8rem",
                  fontWeight: "900",
                }}
              >
                SPACE JUST GOT PERSONAL
              </h6>
              <h1
                className="big-title"
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: "350%",
                  marginBottom: 0,
                }}
              >
                NEW COMMERCE TUTORIAL
              </h1>
              <p className="description" style={{ color: "#f1f1f1" }}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
              <div
                className="price"
                style={{
                  marginBottom: "1rem",
                  color: "white",
                  fontSize: "200%",
                  fontWeight: 700,
                }}
              >
                $3,495
              </div>
              <S.RowBtn>
                <S.WatchBtn>
                  <i class="fas fa-shopping-cart"></i>WATCH NOW!
                </S.WatchBtn>
                <S.InfoBtn>
                  More info
                  <i class="fas fa-chevron-down"></i>
                </S.InfoBtn>
              </S.RowBtn>
            </S.SliderContent>
          </Col>
        </Row>
        <S.DownBtn href="" className="slider-down">
          <i class="fas fa-chevron-down"></i>
        </S.DownBtn>
      </S.SliderContainer>
    </S.Slider>
  );
};

export default Slider;
