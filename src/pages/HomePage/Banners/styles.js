import styled from "styled-components";
export const BannersContainer = styled.div`
  padding-right: 16px;
  padding-left: 16px;
`;

export const SectionsChild = styled.div`
  margin-top: 1rem;
  border-right: 1px solid #ddd;
  padding: 20px;
  text-align: center;
`;
export const SectionsTitle = styled.h6`
  font-size: 1.4em;
  font-weight: 700;
  color: black;
  margin: 16px;
`;

export const SectionsText = styled.p`
  font-size: 1em;
  color: black;
`;

// Phần ảnh

export const FillContent = styled.div`
  display: flex;
  position: relative;
  min-height: 240px;
  padding: 0;
  margin: 1rem 0;
  border: black solid 8px;
  overflow: hidden;
  &:hover .banner-fill__image {
    transform: scale(1.2);
  }
`;

export const FillImage = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  transition: all 1s ease;
`;

export const FillText = styled.h1`
  color: #fff;
  margin: auto;
  z-index: 1;
  font-weight: 700;
  text-align: center;
`;

export const FillOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
