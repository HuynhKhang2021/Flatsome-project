import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Radio,
  Space,
  Divider,
  Input,
  Image,
} from "antd";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";

import { orderCartAction } from "../../../../redux/actions";
import { COLOR } from "../../../../constants/color";
import * as S from "../../styles";

const Payment = ({ setCheckoutStep }) => {
  const [paymentForm] = Form.useForm();
  const [paymentType, setPaymentType] = useState("cod");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.authReducer);
  const { orderInfo } = useSelector((state) => state.orderReducer);
  const { selectedCart } = useSelector((state) => state.cartReducer);
  const { discountInfo } = useSelector((state) => state.discountReducer);

  const totalPrice = selectedCart.reduce((total, item) => {
    return total + item.product?.price * item.quantity;
  }, 0);

  const handleConfirmPayment = (values) => {
    const newValues = {
      ...orderInfo,
      ...values,
      userId: userInfo.data.id,
      products: selectedCart.map((cartItem) => {
        return {
          id: cartItem.product?.id,
          // cartId: cartItem.id,
          name: cartItem.product?.name,
          price: cartItem.product?.price,
          quantity: cartItem.quantity,
        };
      }),
      totalPrice,
    };
    dispatch(
      orderCartAction({
        data: newValues,
        callback: {
          success: () => setCheckoutStep(3),
        },
      })
    );
  };
  const handleChangePaymentType = (e) => {
    setPaymentType(e.target.value);
  };

  const renderSelectedCarts = () => {
    return selectedCart.map((cartItem) => {
      return (
        <S.CartSelectedItem
          size="small"
          key={cartItem.id}
          style={{ marginBottom: "1rem", position: "relative" }}
        >
          <Space>
            <img
              src={cartItem.product.imageList[0]}
              alt=""
              style={{ width: "100px" }}
            />
            <div>
              <p>
                {cartItem.product.name} <strong>x {cartItem.quantity}</strong>
              </p>
              <h3 style={{ fontWeight: "bold", color: COLOR.MINOR_COLOR }}>
                $
                {(cartItem.product?.price * cartItem.quantity).toLocaleString()}
              </h3>
            </div>
          </Space>
        </S.CartSelectedItem>
      );
    });
  };

  return (
    <Row gutter={16} style={{ marginBottom: "1rem" }}>
      <Col span={16}>
        <div style={{ borderBottom: "2px solid #666" }}>
          <S.SectionHeading>
            <ShoppingCartOutlined />
            &nbsp;&nbsp;&nbsp;Payment Method
          </S.SectionHeading>
        </div>
        <Card size="small">
          <Form
            form={paymentForm}
            name="paymentForm"
            layout="vertical"
            initialValues={{
              shipper: "fastDelivery",
              paymentType,
              cardCode: "",
            }}
            onFinish={(values) => handleConfirmPayment(values)}
          >
            <Divider
              style={{ color: "#666", fontSize: "20px", fontWeight: "bold" }}
            >
              Delivery Unit
            </Divider>
            <Form.Item name="shipper">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="fastDelivery">Fast Delivery</Radio>
                  <Radio value="economicalDelivery">Economical delivery</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Divider
              style={{ color: "#666", fontSize: "20px", fontWeight: "bold" }}
            >
              Payment Type
            </Divider>

            <Form.Item name="paymentType" value={paymentType}>
              <Radio.Group
                onChange={(e) => handleChangePaymentType(e)}
                value={paymentType}
              >
                <Space direction="herizontal">
                  <Radio value="cod">Cash on delivery</Radio>
                  <Radio value="momo">Cash by MoMo</Radio>
                  <Radio value="atm">ATM Card/Internet Banking</Radio>
                  <Radio value="visa">Cash by Visa, Master, JCB</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            {paymentType === "momo" && (
              <Image
                style={{ width: "400px", margin: "auto" }}
                src="https://cdn.tgdd.vn/Files/2020/12/14/1313810/xx-ung-dung-nap-tien-dien-thoai-nhanh-chiet-khau--13.jpg"
              ></Image>
            )}
            {paymentType === "atm" && (
              <Image
                style={{ width: "400px", margin: "auto" }}
                src="https://image.shutterstock.com/image-illustration/engraving-style-hatching-pen-pencil-260nw-215627647.jpg"
              ></Image>
            )}
            {paymentType === "visa" && (
              <Image
                style={{ width: "400px", margin: "auto" }}
                src="https://www.rhbgroup.com/images/personal/casa/cards/rhb-visa-debit-chibi-superman.jpg"
              ></Image>
            )}
            {paymentType !== "cod" && (
              <Form.Item
                name="cardCode"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input
                  prefix={
                    <CreditCardOutlined className="site-form-item-icon" />
                  }
                  placeholder="Code"
                />
              </Form.Item>
            )}
          </Form>
        </Card>
      </Col>
      <Col span={8}>
        <div style={{ borderBottom: "2px solid #666" }}>
          <S.SectionHeading>
            <ShoppingCartOutlined />
            &nbsp;&nbsp;&nbsp;Shipment Detail
          </S.SectionHeading>
        </div>
        <Card size="small" style={{ marginBottom: 16 }}>
          <Row justify="space-between">
            <p>Full name</p>
            <p>{orderInfo.fullName}</p>
          </Row>
          <Row justify="space-between">
            <p>Phone number</p>
            <p>{orderInfo.phoneNumber}</p>
          </Row>
          <Row justify="space-between">
            <p>Address</p>
            <p>
              {orderInfo.ward}, {orderInfo.district}, {orderInfo.city}
            </p>
          </Row>
        </Card>
        <div style={{ borderBottom: "2px solid #666" }}>
          <S.SectionHeading>
            <ShoppingCartOutlined />
            &nbsp;&nbsp;&nbsp;Order Summary
          </S.SectionHeading>
        </div>
        <Card size="small" style={{ marginBottom: 16 }}>
          {renderSelectedCarts()}
          <hr />
          <Row justify="space-between">
            <p>Temporary Price</p>
            <p>
              $
              {selectedCart
                .reduce((total, item) => {
                  return total + item.product?.price * item.quantity;
                }, 0)
                .toLocaleString()}
            </p>
          </Row>
          <Row justify="space-between">
            <p>Discount</p>
            <p>
              -$
              {!!discountInfo.data.discountValue
                ? selectedCart
                    .reduce((total, item) => {
                      return total + item.product?.price * item.quantity;
                    }, 0)
                    .toLocaleString() *
                  (discountInfo.data.discountValue * 0.01)
                : 0}
            </p>
          </Row>
          <Row justify="space-between">
            <p>Total Price</p>
            <p>
              $
              {selectedCart
                .reduce((total, item) => {
                  return total + item.product?.price * item.quantity;
                }, 0)
                .toLocaleString() *
                (discountInfo.data.discountValue
                  ? (100 - discountInfo.data.discountValue) * 0.01
                  : 1)}
            </p>
          </Row>
        </Card>
        <Button
          onClick={() => setCheckoutStep(1)}
          style={{ width: "100%", marginBottom: 8 }}
        >
          Back
        </Button>
        <S.StepBtn
          type="primary"
          style={{ width: "100%" }}
          onClick={() => paymentForm.submit()}
        >
          Pay
        </S.StepBtn>
      </Col>
    </Row>
  );
};

export default Payment;
