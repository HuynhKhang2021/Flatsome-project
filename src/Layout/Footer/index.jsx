import React from "react";
import { Row, Col, Button, Input ,Divider} from "antd";

import * as S from "./styles";

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.FooterSections>
          <Row gutter={24}>
            <Col span={24} lg={{ span: 6 }}>
              <div className="footer-description col col-lg-3" style={{marginBottom:'1rem'}}>
                <h5 className="footer__heading">HOW WE GOT STARTED</h5>
                <div style={{ color: "#f1f1f1" }}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat.
                </div>
              </div>
            </Col>
            <Col span={24} lg={{ span: 6 }}>
              <div>
                <h5 className="footer__heading">latest news</h5>
                <ul style={{ paddingLeft: 0 }}>
                  <S.FooterNewsItem>
                    <img
                      src="https://flatsometutorial.com/wp-content/uploads/2020/03/blog-post-2-150x150.jpg"
                      alt=""
                      style={{ width: "45px", marginRight: "15px" }}
                    />
                    <S.FooterNewsItemLink>
                      Good place to study
                    </S.FooterNewsItemLink>
                  </S.FooterNewsItem>
                  <S.FooterNewsItem>
                    <img
                      src="https://flatsometutorial.com/wp-content/uploads/2020/03/camera-table-150x150.jpg"
                      alt=""
                      style={{ width: "45px", marginRight: "15px" }}
                    />
                    <S.FooterNewsItemLink>
                      A new camera to buy
                    </S.FooterNewsItemLink>
                  </S.FooterNewsItem>
                  <S.FooterNewsItem>
                    <img
                      src="https://flatsometutorial.com/wp-content/uploads/2020/03/blog-post-3-150x150.jpg"
                      alt=""
                      style={{ width: "45px", marginRight: "15px" }}
                    />
                    <S.FooterNewsItemLink>10 best laptops</S.FooterNewsItemLink>
                  </S.FooterNewsItem>
                </ul>
              </div>
            </Col>
            <Col span={24} lg={{ span: 6 }}>
              <S.FooterProducts>
                <h5 className="footer__heading">products</h5>
                <ul className="footer-products__list">
                  <li className="footer-products__item">
                    <img
                      src="https://flatsometutorial.com/wp-content/uploads/2020/03/product-20-300x330-1-100x100.jpg"
                      alt=""
                      className="footer-products__item-img"
                    />
                    <span className="footer-products__item-content">
                      <a href="" className="footer-products__item-name">
                        I-Phone Z
                      </a>
                      <h5 className="footer-products__item-price">$600.00</h5>
                    </span>
                  </li>
                  <li className="footer-products__item">
                    <img
                      src="https://flatsometutorial.com/wp-content/uploads/2020/03/product-5-100x100.jpg"
                      alt=""
                      className="footer-products__item-img"
                    />
                    <span className="footer-products__item-content">
                      <a href="" className="footer-products__item-name">
                        E-Phone Z
                      </a>
                      <h5 className="footer-products__item-price">$500.00</h5>
                    </span>
                  </li>
                  <li className="footer-products__item">
                    <img
                      src="https://flatsometutorial.com/wp-content/uploads/2020/03/product-7-100x100.jpg"
                      alt=""
                      className="footer-products__item-img"
                    />
                    <span className="footer-products__item-content">
                      <a href="" className="footer-products__item-name">
                        Super Cell
                      </a>
                      <h5 className="footer-products__item-price">$599.99</h5>
                    </span>
                  </li>
                  <li className="footer-products__item">
                    <img
                      src="https://flatsometutorial.com/wp-content/uploads/2020/03/Image-25-100x100.jpg"
                      alt=""
                      className="footer-products__item-img"
                    />
                    <span className="footer-products__item-content">
                      <a href="" className="footer-products__item-name">
                        Camo Headphones
                      </a>
                      <h5 className="footer-products__item-price">$200.00</h5>
                    </span>
                  </li>
                </ul>
              </S.FooterProducts>
            </Col>
            <Col span={24} lg={{ span: 6 }}>
              <S.FooterLetter className="footer-letter col col-lg-3">
                <h5 className="footer__heading">new letter</h5>
                <form action="" className="footer-letter__form">
                  <p className="footer-letter__email">Email address:</p>
                  <Input
                    type="text"
                    placeholder="Your email address"
                    className="footer-letter__input"
                  />
                  <Button className="footer-letter__btn">SIGN UP</Button>
                </form>
              </S.FooterLetter>
            </Col>
          </Row>
        </S.FooterSections>
      </S.FooterContent>
      <Divider style={{borderColor:'#fff'}}/>
      <S.FooterPay>
        <div className="footer-pay_list">
          <span className="footer-pay_item">
            <i class="footer-pay_icon fab fa-stripe"></i>
          </span>
          <span className="footer-pay_item">
            <i class="footer-pay_icon fab fa-cc-paypal"></i>
          </span>
          <span className="footer-pay_item">
            <i class="footer-pay_icon fab fa-cc-visa"></i>
          </span>
          <span className="footer-pay_item">
            <i class="footer-pay_icon fab fa-cc-mastercard"></i>
          </span>
          <span className="footer-pay_item">
            <i class="footer-pay_icon fab fa-amazon"></i>
          </span>
        </div>
        <p className="footer-pay_copy">
          Copyright 2021 © <b> UX Themes</b>
        </p>
      </S.FooterPay>
      <S.FooterNotice>
        <p className="footer-notice_text">
          New Flatsome Theme Tutorial is LIVE!{" "}
          <a href="https://www.youtube.com/watch?v=Hjto35ir490">
            https://www.youtube.com/watch?v=Hjto35ir490
          </a>
        </p>
      </S.FooterNotice>
    </S.FooterContainer>
  );
};

export default Footer;
