import styled from "styled-components";
import { DEVICES } from "../../../constants/device";
import { Row } from "antd";
export const Slider = styled.div`
  position: relative;
  min-height: 550px;
  /* padding-top: 200px 1rem 1rem; */
  background-image: url(https://flatsometutorial.com/wp-content/uploads/2020/03/slider8-3.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: cover;
  overflow: hidden;
`;

export const SliderContent = styled.div`
  margin-top: 5em;
  margin-bottom: 5em;
`;

export const WatchBtn = styled.button`
  width: 220px;
  height: 46px;
  margin-top:1rem;
  color: #f1f1f1;
  background-color: transparent;
  font-weight: 700;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  margin-right: 1em;
  i {
    margin-top: 4px;
    margin-right: 0.5em;
  }
  &:hover {
    background-color: white;
    color: #666;
  }
`;

export const InfoBtn = styled.button`
  width: 220px;
  height: 46px;
  margin-top:1rem;
  background-color: white;
  color: #666;
  font-weight: 700;
  border-radius: 4px;
  border: none;
  i {
    margin-left: 0.5em;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const DownBtn = styled.a`
  z-index: 1;
  position: absolute;
  bottom: 2em;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  i {
    font-size: 2em;
    color: #f1f1f1;
  }
`;
export const SliderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
  padding-left: 16px;
  padding-right: 16px;
`;
export const RowBtn = styled(Row)`
  /* @media ${DEVICES} */
`