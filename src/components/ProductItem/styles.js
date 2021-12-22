import styled from "styled-components";
import { Card } from "antd";
import { COLOR } from "../../constants/color";
export const Product = styled(Card)`
  padding: 0.8rem;
  background-color: transparent;
  color: transparent;
  transition: all 0.3s ease-out;
  p {
    margin-bottom: 0;
  }
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    & img {
      transform: scale(1.1)
    }
  }

  .ant-card-body {
    padding: 0.5rem;
  }
  .ant-card-actions > li {
    margin: 12px 0 0;
  }
`;
export const ProductImg = styled.img`
  background-color: #ccc;
  transition: all ease 0.3s;
  background-color: #fff;
  width: 100%;
  height: 173px;
  object-fit: contain;
  transition: all 0.5s;
`;

export const ProductName = styled.h4`
  font-weight: 600;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;
export const ProductType = styled.p`
  text-transform: capitalize;
  font-weight: 600;
  color: #8c8c8c;
  font-size: .9rem;
  border-bottom: none;
`;
export const ProductBrand = styled.p`
  text-transform: capitalize;
  /* font-weight: 600; */
  color: #003a8c;
  font-size: 1rem;
  border-bottom: none;
`;

export const ProductPrice = styled.h3`
  font-weight: 600;
  color: #f5222d;
  margin-bottom: 0;
`;

export const ProductAddBtn = styled.button`
  height: 2rem;
  /* width: 180px; */
  padding: 0px 20px;
  background-color: ${COLOR.MAIN_COLOR};
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 ${COLOR.MINOR_COLOR};
  transition: all ease-out 0.5s;
  span {
    text-transform: uppercase;
  }
  &:hover {
    color: #000;
    box-shadow: inset 180px 0 0 0 ${COLOR.MINOR_COLOR};
  }
`;
