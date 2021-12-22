import styled from "styled-components";
import topWrapperImage from "../../assets/images/top_wrapper.jpg";
export const TopWrapperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background-image: url(${topWrapperImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 60px;
  
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  & .ant-breadcrumb-link,
  & .ant-breadcrumb-separator {
    position: relative;
    color: white;
    z-index: 1;
    font-size:1rem;
  }
  & .anticon {
    font-size: 1.6rem;
  }
`;
