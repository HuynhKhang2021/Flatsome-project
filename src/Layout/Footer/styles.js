import styled from "styled-components";
import { DEVICES } from "../../constants/device";
export const FooterContainer = styled.div`
  min-height: 500px;
  background-color: #5b5b5b;
`;
export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const FooterSections = styled.div`
  padding-top: 2rem;
  background-color: #5b5b5b;
  & ul {
    list-style: none;
  }
  & h5 {
    color: #f1f1f1;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1rem;
  }
  .footer__heading::after {
    margin-top: 1rem;
    content: "";
    display: block;
    height: 3px;
    width: 30px;
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 1;
    text-align: center;

  }
  @media ${DEVICES.laptop} {
    text-align: left;
  }
  min-height: 430px;
`;

export const FooterNewsItem = styled.li`
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 0px;
  &:last-child {
    border: none;
  }
`;

export const FooterNewsItemLink = styled.a`
  color: #f1f1f1;
  &:hover {
    color: #fff;
  }
`;

export const FooterProducts = styled.div`
  .footer-products__list {
    padding-left: 0;
    .footer-products__item {
      padding: 10px 0;
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);

      .footer-products__item-img {
        width: 60px;
      }
      .footer-products__item-content {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .footer-products__item-name {
          color: #f1f1f1;
        }
        .footer-products__item-price {
          margin-top: auto;
          margin-bottom: auto;
        }
      }
      &:last-child {
        border: none;
      }
    }
  }
`;

export const FooterLetter = styled.div`
  .footer-letter__form {
    display: flex;
    flex-direction: column;
    .footer-letter__email {
      font-weight: 600;
      color: #f1f1f1;
      margin-bottom: 0;
      font-size: 1rem;
    }
    .footer-letter__input {
      font-weight: 600;
      font-size: 0.8rem;
      margin-bottom: 14px;
      padding: 6px;
      /* outline: rgba(102, 102, 102, 0.85); */
      border: none;
    }
    .footer-letter__btn {
      width: 103px;
      height: 39px;
      font-weight: 600;
      color: #fff;
      background-color: #000;
      border: none;
    }
  }
`;

export const FooterPay = styled.div`
  text-align: center;
  padding: 15px;
  .footer-pay_list {
    .footer-pay_item {
      // width: 49px;
      // height: 32px;
      margin: 10px;
      .footer-pay_icon {
        border-radius: 4px;
        //   background-color: rgba(0, 0, 0, 0.1);
        color: #fff;
        font-size: 2em;
        width: 50px;
        padding: 4px;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .footer-pay_copy {
    font-size: 0.8em;
    color: #5b5b5b;
    margin-bottom: 0;
  }
`;

export const FooterNotice = styled.div`
  margin-bottom: 0;
  text-align: center;
  background-color: black;
  color: #fff;
  font-size: 1em;
  margin: 0 -15px;
  .footer-notice_text {
    margin-bottom: 0%;
  }
`;
