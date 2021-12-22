import styled, { css } from "styled-components";
import { COLOR } from "../../constants/color";
import { Image, Card } from "antd";
export const ProductDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 1rem;
`;

export const ProductDetail = styled.div`
  margin: 0;
  /* padding-right: 2rem; */
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Product = styled.div`
  padding: 1rem;
`;

export const ProductImages = styled.div`
  /* height: 100%; */
  /* width: 100%;  */
`;

export const ProductMainImage = styled(Image)`
  object-fit: contain;
  border: 1px solid #ccc;
  width: 100%;
  height: auto;
`;
export const ListImages = styled.div`
  /* margin-top: 2rem; */
  /* display: flex; */
  /* overflow: hidden; */
  /* height:200px; */
  width:100%;
  

  img {
    width: 80px;
    height: 80px;
    margin: 0 4px;
    padding: 4px;
    object-fit: contain;
    border: 1px solid #ccc;
  }
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 350px;
  /* padding-left: 2rem; */
  /* justify-content: center; */
  /* align-items: center; */
  & .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    color: ${COLOR.MINOR_COLOR};
    border-color: ${COLOR.MINOR_COLOR};
    border-right-color: ${COLOR.MINOR_COLOR};
  }
  & .ant-radio-button-wrapper:hover {
    color: ${COLOR.MINOR_COLOR};
  }
  &
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
    background-color: ${COLOR.MINOR_COLOR};
  }
  &
    .ant-radio-button-wrapper-checked:not([class*=" ant-radio-button-wrapper-disabled"]).ant-radio-button-wrapper:first-child {
    border-right-color: ${COLOR.MINOR_COLOR};
  }
  & .ant-btn-primary {
    background-color: ${COLOR.MINOR_COLOR};
    border-color: ${COLOR.MINOR_COLOR};
    border-radius: 4px;
  }

  & .ant-btn:hover {
    color: ${COLOR.MINOR_COLOR};
    border-color: ${COLOR.MINOR_COLOR};
  }
  & .ant-btn:focus {
    color: #fff;
    border-color: ${COLOR.MINOR_COLOR};
  }
  & .ant-btn-primary:hover {
    color: #fff;
  }
`;

export const ContentPaths = styled.div`
  & a {
    font-size: 0.8rem;
    color: rgba(102, 102, 102, 0.7);
    text-transform: uppercase;
  }
  & a:hover {
    color: black;
  }
`;
export const ProductName = styled.h2`
  font-weight: 600;
  margin-bottom: 0;
  /* font-size: 1.5rem; */
  &::after {
    width: 2rem;
    height: 2px;
    border-bottom: 2px solid #ccc;
  }
`;
export const ProductPrice = styled.h3`
  font-weight: 600;
  font-size: 1.6rem;
  color: ${COLOR.MINOR_COLOR};
`;
export const DiscountRemind = styled.span`
  padding: 8px 12px;
  margin-bottom: 1rem;
  margin-right: auto;
  border: 1px solid #eb2f96;
  color: #eb2f96;
`;
export const AddSection = styled.div`
  display: flex;
  margin-top: auto;
`;

export const AmountBtn = styled.button``;

export const ButtonAdd = styled.button`
  margin-left: 2rem;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  text-transform: uppercase;
`;

export const ContentFooter = styled.div`
  /* margin-top: auto;
  border-top: 1px solid #cccccc; */
  p {
    font-size: 0.8rem;
  }
  a {
    padding:8px;
    color: #fff;
    background-color: ${COLOR.MAIN_COLOR}
    margin-left: 2rem;
  }
  i {
    margin:auto;
    font-size: 1.2rem;
  }
`;

// Phần FeedBack Product

export const ProductFeedBack = styled.div`
  padding: 2rem 2rem 2rem 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  transition: all ease 0.5s;
`;

export const FeedBackTabs = styled.div`
  /* border-right: 1px solid #ccc; */
  padding-right: 0;
  margin-right: 0;
`;
export const TabHeading = styled.p`
  height: 40px;
  font-weight: 600;
  margin: 0;
  color: rgba(102, 102, 102, 0.85);
  cursor: pointer;
  font-size: 0.8rem;
  line-height: 40px;
  text-transform: uppercase;
  overflow: hidden;
  /* transition: all 1s ease-in-out; */
  &:nth-child(1) {
    border-bottom: 1px solid #ccc;
  }
  ${({ active }) =>
    active &&
    css`
      color: rgba(17, 17, 17, 0.85);
      border-right: 3px solid rgba(17, 17, 17, 0.85);
    `}
  &:hover {
    color: rgba(17, 17, 17, 0.85);
    border-right: 3px solid rgba(17, 17, 17, 0.85);
  }
`;
export const FeedBackContent = styled.div`
  padding-left: 2rem;
  & h5 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  & Form {
    padding: 1rem;
    border: 1.5px solid black;
  }
  & .ant-btn-primary {
    background-color: ${COLOR.MINOR_COLOR};
    border-color: ${COLOR.MINOR_COLOR};
    border-radius: 4px;
  }
`;
export const Rate = styled.span`
  /* color : #ccc; */
  & p {
    font-weight: 600;
    margin: 0;
  }
  & li.ant-rate-star {
    color: black;
    overflow: hidden;
  }
`;
export const ProductLabel = styled.p`
  color: ${COLOR.MAIN_COLOR};
  font-size: 1rem;
`;
export const ProductBrandName = styled.span`
  padding:8px 20px;
  font-weight: bold;
  text-transform: uppercase;
  width:85px;
  border: 1px solid ${COLOR.MAIN_COLOR};
`;
export const FilterSideContainer = styled.div`
  padding-left: 1rem;
  padding-top: 20px;
  .ant-btn-primary {
    background-color: #000;
    border: none;
    font-weight: 600;
  }
  .ant-btn-primary:focus {
    color: #fff;
  }
  .ant-input {
    box-shadow: inset 0 0px 0px 1px rgba(0, 0, 0, 0.1);
    border-color: #ccc;
    width:85px;
  }
  .ant-input:focus,
  .ant-input:hover {
    border-color: #ccc;
  }
  // Chỉnh màu thanh Range filter
  .ant-slider-track {
    background-color: #bfbfbf;
    transition: all ease 0.2s;
  }
  .ant-slider-handle {
    background-color: #666;
    border: solid 2px #666;
    transition: all ease 0.2s;
  }
  .ant-slider:hover .ant-slider-track {
    background-color: #666;
  }
  .ant-slider:hover .ant-slider-handle {
    border: solid 2px #666;
  }
`;

export const VideoDetail = styled.iframe`
  width: 100%;
`;

export const ProductSpecification = styled.div`
  & th {
    text-align: left;
    padding: 8px;
    text-transform: capitalize;
    background-color: #fafafa;
    border: 1px solid #ccc;
  }
  & td {
    text-align: left;
    padding: 8px;
    text-transform: capitalize;
    border: 1px solid #ccc;
  }
  & table {
    width: 100%;
  }
`;
export const DetailInformation = styled.div`
  & img {
    max-width: 100%;
    height:auto;
    object-fit: contain:
  }
  & h2 {
    font-weight: bold;
    text-transform: italic;
  }
  & h3 {
    font-style: italic;
    text-decoration: underline;
  }
`;
export const InformationHeading = styled.h3`
  font-weight: bold;
  cursor: pointer;

  background-color: ${COLOR.MAIN_COLOR};
  color: #fff;
  margin-bottom: 0;
  padding: 4px 12px;
  display: inline-block;
  ${({ active }) =>
    !active &&
    css`
      background-color: #fff;
      color: ${COLOR.MAIN_COLOR};
    `}
  transition: all ease 0.3s;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
`;
export const ProductsRelatedName = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px 12px;
  text-transform: uppercase;
  background-color: ${COLOR.MINOR_COLOR};
  color: #fff;
  border-radius: 2px;
`;
export const ProductsRelatedItem = styled(Card)`
  cursor: pointer;
  &:hover {
    border-color: ${COLOR.MINOR_COLOR};
  }
`;
export const ProductPolicy = styled.div`
  /* margin-top: 1rem; */
  /* margin-bottom: 1rem; */
`;
export const ProductPolicyContent = styled.div`
  /* margin-top: 1rem; */
  /* padding: 1rem; */
  border: 1px solid #ccc;
  i {
    width: 40px;
    padding-right: 1rem;
    font-size: 1.2rem;
    color: ${COLOR.MINOR_COLOR};
  }
  & p {
    color: #666;
    margin: 0;
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }
  & p:last-child {
    border-bottom: none;
  }
`;
export const SectionHeading = styled.h3`
  font-weight: bold;
  cursor: pointer;
  background-color: ${COLOR.MAIN_COLOR};
  color: #fff;
  margin-bottom: 0;
  padding: 4px 12px;
  display: inline-block;
  transition: all ease 0.3s;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
`;
