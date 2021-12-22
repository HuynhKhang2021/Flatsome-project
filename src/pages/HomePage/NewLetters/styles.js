import styled from "styled-components";

export const LettersContainer = styled.div`
  min-height: 378px;
  margin-left: -15px;
  margin-right: -15px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const LettersOverlay = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  height: 378px;
  width: 100%;
`;

export const LettersContent = styled.div`
  z-index: 1;
  max-width: 822px;
  margin: auto;
  padding:0 16px;
`;
