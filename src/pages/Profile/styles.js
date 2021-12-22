import styled, { css } from "styled-components";
import { COLOR } from "../../constants/color";
import { DEVICES } from "../../constants/device";
import { Row } from "antd";

export const OverviewContainer = styled.div`
  /* background-color: #f3f5fa; */
`;
export const ProfileWrapper = styled.div`
  margin: 24px auto;
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
`;

export const ProfileContainer = styled(Row)`
  width: 100%;
  margin: 0 auto;
  /* padding: 0; */
`;

export const LeftContainer = styled.div`
  left: 0;
  top: -60px;
  display: flex;
  flex-direction: column;
  /* width: 25%; */
  height: 512px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px 16px;
`;

export const RightContainer = styled.div`
  background-color: #f7fafc;
  right: 0;
  top: -60px;
  /* position: absolute; */
  /* padding: 16px; */
  /* width: 100%; */
  border-radius: 8px;
`;

export const AvatarContainer = styled.div`
  /* position: absolute; */
  /* top: -70px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100%;
  height: 280px;
`;

export const TabItem = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #fff;
  font-size: 1rem;
  font-weight: bold;
  color: ${COLOR.MAIN_COLOR}
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #d9d9d9;
  }
  text-align: center;
  .ant-space {
    margin: 0 auto;
  }
  @media ${DEVICES.laptop} {
    .ant-space {
      margin-left: 0;
    }
  }
  ${({ active }) =>
    active &&
    css`
      background-color: #d9d9d9;
      color: #fff;
      border-right: 5px solid ${COLOR.MAIN_COLOR};
    `}
`;
//Common

export const PageTitle = styled.h3`
  padding: 16px;
  margin-bottom: 0;
  font-weight: bold;
  color: ${COLOR.MAIN_COLOR};
`;
export const SettingBtn = styled.button`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 1rem;
  color: #fff;
  background-color: ${COLOR.MINOR_COLOR};
  border: none;
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
export const ContentContainer = styled.div`
  background-color: #f7fafc;
`;
export const UserInformation = styled.div`
  background-color: #f7fafc;
`;
export const UserCOntact = styled.div`
  background-color: #f7fafc;
`;
export const SectionTitle = styled.h3``;

export const ProductItem = styled(Row)`
  padding: 4px 0;
  & p {
    margin: 0;
  }
`;
export const ProductOrder = styled.p`
  font-weight: bold;
  color: ${COLOR.MAIN_COLOR}
  cursor: pointer;
  &:hover {
    color: ${COLOR.MINOR_COLOR};
  }
`;
