import React, { useState } from "react";
import { Avatar, Space, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import TopWrapper from "../../components/TopWrapper";
import OrderHistory from "./components/OrderHistory";
import UserInfo from "./components/UserInfo";
import ChangePassword from "./components/ChangePassword";

import { BREADCRUMB, PROFILE_TABS } from "./constants";
import { COLOR } from "../../constants/color";
import { ROUTER } from "../../constants/router";

import * as S from "./styles";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { userInfo } = useSelector((state) => state.authReducer);
  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfoLocal) {
    return <Redirect to={ROUTER.HOME} />;
  }

  const renderProfileTab = () => {
    return PROFILE_TABS.map((tabItem, tabIndex) => (
      <S.TabItem
        key={`tab-${tabIndex}`}
        active={activeTab === tabItem.value}
        onClick={() => setActiveTab(tabItem.value)}
      >
        <Space size={12} style={{ color: COLOR.MAIN_COLOR }}>
          {tabItem.icon}
          {tabItem.title}
        </Space>
      </S.TabItem>
    ));
  };

  return (
    <S.OverviewContainer>
      <TopWrapper titlePage="Trang cá nhân" breadcrumb={BREADCRUMB} />
      <S.ProfileWrapper>
        {/* <S.ProfileContainer className="container"> */}
        <Row gutter={[32, 16]} style={{ width: "100%", margin: "0 auto" }}>
          <Col lg={6} xs={24}>
            <S.LeftContainer>
              <S.AvatarContainer>
                <Avatar size={180} icon={<UserOutlined />} />
                <h2 style={{ color: COLOR.MAIN_COLOR }}>
                  {userInfo.data?.username}
                </h2>
              </S.AvatarContainer>
              {renderProfileTab()}
            </S.LeftContainer>
          </Col>
          <Col lg={18} xs={24}>
            <S.RightContainer>
              {activeTab === 0 && <UserInfo />}
              {activeTab === 1 && <OrderHistory />}
              {activeTab === 3 && <ChangePassword />}
            </S.RightContainer>
          </Col>
        </Row>
        {/* </S.ProfileContainer> */}
      </S.ProfileWrapper>
    </S.OverviewContainer>
  );
};

export default ProfilePage;
