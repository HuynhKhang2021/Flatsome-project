import styled from "styled-components";
import { DEVICES } from "../../constants/device";
export const Header = styled.div`
  background: black;
  display: none;
  @media ${DEVICES.laptop} {
    display: block;
  }
  transition: all ease 0.3s;
`;
export const HeaderContainer = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  min-height: 28px;
  margin: 0 auto;
`;

export const HeaderText = styled.span`
  color: white;
  font-size: 0.8em;
  font-weight: 600;
  margin-top: auto;
  margin-bottom: auto;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const HeaderLink = styled.span`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  @media (max-width: 768px) {
    display: none;
  }
  .header-link_text {
    margin-right: 1rem;
    font-size: 0.8rem;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.8rem;
    color: #ccc;
    text-decoration: none;
    overflow: hidden;
    /* line-height:28px; */
    i {
      text-align: center;
      width: 1rem;
      height: 100%;
      padding-top: 2px;
      font-size: 1rem;
      .facebook {
        color: #3a589d;
      }
      .instagram {
      }
      .tiktok {
      }
      .twitter {
      }
      .envelope {
      }
      .pinterest {
      }
      .youtube {
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
