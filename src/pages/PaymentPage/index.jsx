import { useState, useEffect } from "react";
import { Steps, Divider, Row, Col,notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  ShoppingCartOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { BREADCRUMB } from "./constant";
import { getCartListAction } from "../../redux/actions";

// import CartContent from "./Cart/CartContent";
import Checkout from "./components/Checkout";
import Info from "./components/Info";
import Success from './components/Success'
import TopWrapper from "../../components/TopWrapper";

import {ROUTER} from '../../constants/router'

import * as S from "./styles";

const PaymentPage = () => {
  const [checkoutStep, setCheckoutStep] = useState(0);

  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfoLocal) {
    notification.error({
      message: "You have to login!",
    });
    return <Redirect to={ROUTER.HOME} />;
  }

  return (
    <>
      <TopWrapper breadcrumb={BREADCRUMB}></TopWrapper>
      <S.PaymentPageContainer>
        <Divider
          plain={false}
          style={{
            overflow: "hidden",
            fontSize: "1.6rem",
            fontWeight: "bold",
          }}
        >
          USE CODE DARREL10 FOR 10% OFF!
        </Divider>
        <S.PaymentSteps>
          <Steps
            current={checkoutStep}
            // onChange={(current) => setCurrenStep(current)}
          >
            <Steps.Step
              style={{ overflow: "hidden" }}
              title={<S.StepTitle>shopping cart</S.StepTitle>}
              icon={<ShoppingCartOutlined />}
            />
            <Steps.Step
              style={{ overflow: "hidden" }}
              title={<S.StepTitle>information Order</S.StepTitle>}
              icon={<IdcardOutlined />}
            />
            <Steps.Step
              style={{ overflow: "hidden" }}
              title={<S.StepTitle>finish</S.StepTitle>}
              icon={<CheckCircleOutlined />}
            />
          </Steps>
        </S.PaymentSteps>

        {checkoutStep === 0 && (
          <Checkout setCheckoutStep={setCheckoutStep}></Checkout>
        )}
        {checkoutStep === 1 && <Info setCheckoutStep={setCheckoutStep}></Info>}
        {checkoutStep === 2 && (
          <Success setCheckoutStep={setCheckoutStep}></Success>
        )}
      </S.PaymentPageContainer>
    </>
  );
};

export default PaymentPage;
