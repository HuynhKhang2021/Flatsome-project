import React from "react";
import { useSelector } from "react-redux";
import { Space, Card, Descriptions } from "antd";

import * as S from "../styles";
import { COLOR } from "../../../constants/color";
import { ROUTER } from "../../../constants/router";

const UserInfo = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  return (
    <>
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <S.PageTitle>Personal Information</S.PageTitle>
        <S.SettingBtn>Change Information</S.SettingBtn>
      </Space>
      <S.ContentContainer>
        {/* <S.UserInformation>
          <S.SectionTitle>user information</S.SectionTitle>
        </S.UserInformation> */}
        <S.UserCOntact>
          <Card size="small">
            <Descriptions bordered size="small">
              <Descriptions.Item label="Full Name" span={3}>
               {userInfo.data?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
              {userInfo.data?.email}
              </Descriptions.Item>
              <Descriptions.Item style={{textTransform:'capitalize'}} label="Gender" span={3}>
              {userInfo.data?.gender}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </S.UserCOntact>
      </S.ContentContainer>
    </>
  );
};

export default UserInfo;
