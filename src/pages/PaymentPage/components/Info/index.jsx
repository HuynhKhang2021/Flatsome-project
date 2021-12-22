import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  Space,
  Divider,
  Radio,
  Image,
} from "antd";
import {
  UserOutlined,
  AccountBookOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

import {
  setOrderInfoAction,
  getCityAddressAction,
  getDistrictAddressAction,
  getWardAddressAction,
  orderCartAction,
} from "../../../../redux/actions";
import { useEffect } from "react";

import { COLOR } from "../../../../constants/color";

import * as S from "../../styles";

const Info = ({ setCheckoutStep }) => {
  const [infoForm] = Form.useForm();
  const [paymentType, setPaymentType] = useState("cod");
  const [shipmentType, setShipmentType] = useState("fastDelivery");

  const { userInfo } = useSelector((state) => state.authReducer);
  const { selectedCart } = useSelector((state) => state.cartReducer);
  console.log("🚀 ~ file: index.jsx ~ line 45 ~ Info ~ selectedCart", selectedCart)
  const { discountInfo } = useSelector((state) => state.discountReducer);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.addressReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCityAddressAction());
  }, []);

  const totalPrice = selectedCart.reduce((total, item) => {
    return total + item.product?.price * item.quantity;
  }, 0);

  const handleConfirmInfo = (values) => {
    const cityOption = cityList.data.find(
      (cityItem) => cityItem.code === values.city
    );
    const districtOption = districtList.data.find(
      (districtItem) => districtItem.code === values.district
    );
    const wardOption = wardList.data.find(
      (wardItem) => wardItem.code === values.ward
    );
    const newValues = {
      ...values,
      city: cityOption.name,
      district: districtOption.name,
      ward: wardOption.name,
      userId: userInfo.data.id,
      products: selectedCart.map((cartItem) => {
        return {
          id: cartItem.product?.id,
          // cartId: cartItem.id,
          name: cartItem.product?.name,
          price: cartItem.product?.price,
          quantity: cartItem.quantity,
          ...(cartItem.option && {option: cartItem.option})
          
        };
      }),
      totalPrice,
    };
    dispatch(
      orderCartAction({
        data: newValues,
        callback: {
          success: () => setCheckoutStep(2),
        },
      })
    );
    // setCheckoutStep(2);
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
                {cartItem.product.name}&nbsp;
                <strong>{cartItem.option?.name}</strong>&nbsp;
                <strong style={{ color: COLOR.MINOR_COLOR }}>
                  x {cartItem.quantity}
                </strong>
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

  const renderCityAddressList = () =>
    cityList.data?.map((stateItem) => {
      return (
        <Select.Option key={stateItem.code} value={stateItem.code}>
          {stateItem.name}
        </Select.Option>
      );
    });

  const handleSelectCity = (value) => {
    infoForm.setFieldsValue({ district: "" });
    dispatch(getDistrictAddressAction({ code: value }));
  };
  const handleSelectDistrict = (value) => {
    infoForm.setFieldsValue({ ward: "" });
    dispatch(getWardAddressAction({ code: value }));
  };

  const renderDistrictAddressList = () =>
    districtList.data?.map((districtItem) => {
      return (
        <Select.Option key={districtItem.code} value={districtItem.code}>
          {districtItem.name}
        </Select.Option>
      );
    });

  const renderWardAddressList = () =>
    wardList.data?.map((wardItem) => {
      return (
        <Select.Option key={wardItem.code} value={wardItem.code}>
          {wardItem.name}
        </Select.Option>
      );
    });

  const handleChangePaymentType = (e) => {
    setPaymentType(e.target.value);
  };
  const handleChangeShipmentType = (e) => {
    setShipmentType(e.target.value);
  };




  return (
    <Row gutter={16} style={{ marginBottom: "1rem" }}>
      <Col lg={16} xs={24}>
        <div style={{ borderBottom: "2px solid #666" }}>
          <S.SectionHeading>
            <ShoppingCartOutlined />
            &nbsp;&nbsp;&nbsp;Shipment Address
          </S.SectionHeading>
        </div>
        <Card size="small" style={{ backgroundColor: "Fafafa" }}>
          <Form
            // style={{backgroundColor:'F0F0F0'}}
            form={infoForm}
            name="infoForm"
            layout="vertical"
            onFinish={(values) => handleConfirmInfo(values)}
          >
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Full name"
              />
            </Form.Item>

            <Row gutter={24}>
              <Col lg={12}  sm={24} xs={24}>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
              </Col>
              <Col lg={12}  sm={24} xs={24}>
                <Form.Item
                  name="phoneNumber"
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <Input
                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                    placeholder="Phone number"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label="Privince/City"
                  name="city"
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <Select onChange={(e) => handleSelectCity(e)}>
                    {renderCityAddressList()}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label="Town/Disctrict"
                  name="district"
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <Select onChange={(e) => handleSelectDistrict(e)}>
                    {renderDistrictAddressList()}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label="Ward"
                  name="ward"
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <Select>{renderWardAddressList()}</Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="note">
              <Input.TextArea
                prefix={<AccountBookOutlined className="site-form-item-icon" />}
                placeholder="Note"
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>
          </Form>
        </Card>
        <div style={{ borderBottom: "2px solid #666" }}>
          <S.SectionHeading>
            <ShoppingCartOutlined />
            &nbsp;&nbsp;&nbsp;Payment Method
          </S.SectionHeading>
        </div>
        <Card size="small">
          <Form
            form={infoForm}
            name="paymentForm"
            layout="vertical"
            initialValues={{
              shipper: "fastDelivery",
              paymentType,
              cardCode: "",
            }}
            onFinish={(values) => handleConfirmInfo(values)}
          >
            <Divider
              style={{ color: "#666", fontSize: "20px", fontWeight: "bold" }}
            >
              Delivery Unit
            </Divider>
            {/* <Form.Item name="shipper">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="fastDelivery">Fast Delivery</Radio>
                  <Radio value="economicalDelivery">Economical delivery</Radio>
                </Space>
              </Radio.Group>
            </Form.Item> */}
            <Row>
              <Col span={8}>
                <Form.Item name="shipper" value={shipmentType}>
                  <Radio.Group
                    onChange={(e) => handleChangeShipmentType(e)}
                    value={paymentType}
                  >
                    <Space direction="vertical">
                      <Radio value="fastDelivery">Fast Delivery</Radio>
                      <Radio value="economicalDelivery">
                        Economical delivery
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col lg={16} xs={24}>
                {shipmentType === "fastDelivery" && (
                  <Image
                    style={{
                      width: "400px",
                      border: "1px solid #ccc",
                      height: "200px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src="https://play-lh.googleusercontent.com/pUYxv523WbfWkY8aV-g-0sgcDaZOo9xOgSfyvvoL3FM610DKU9BH7HDwaH-4upT21Gg"
                  ></Image>
                )}
                {shipmentType === "economicalDelivery" && (
                  <Image
                    style={{
                      width: "400px",
                      border: "1px solid #ccc",
                      height: "200px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src="https://thumbs.dreamstime.com/z/motorcycle-rider-fast-courier-driver-bike-scooter-delivery-moped-motorbike-economical-ecological-city-transport-tourism-178426598.jpg"
                  ></Image>
                )}
              </Col>
            </Row>
            <Divider
              style={{ color: "#666", fontSize: "20px", fontWeight: "bold" }}
            >
              Payment Type
            </Divider>
            <Row>
              <Col span={8}>
                <Form.Item name="paymentType" value={paymentType}>
                  <Radio.Group
                    onChange={(e) => handleChangePaymentType(e)}
                    value={paymentType}
                  >
                    <Space direction="vertical">
                      <Radio value="cod">Cash on delivery</Radio>
                      <Radio value="momo">Cash by MoMo</Radio>
                      <Radio value="atm">ATM Card/Internet Banking</Radio>
                      <Radio value="visa">Cash by Visa, Master, JCB</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={16}>
                {paymentType === "cod" && (
                  <Image
                    style={{
                      width: "400px",
                      border: "1px solid #ccc",
                      height: "200px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src="https://thientu.vn/userfiles/images/Cash-on-delivery-la-gi.jpg"
                  ></Image>
                )}
                {paymentType === "momo" && (
                  <Image
                    style={{
                      width: "400px",
                      border: "1px solid #ccc",
                      height: "200px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src="https://cdn.tgdd.vn/Files/2020/12/14/1313810/xx-ung-dung-nap-tien-dien-thoai-nhanh-chiet-khau--13.jpg"
                  ></Image>
                )}
                {paymentType === "atm" && (
                  <Image
                    style={{
                      width: "400px",
                      border: "1px solid #ccc",
                      height: "200px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src="https://image.shutterstock.com/image-illustration/engraving-style-hatching-pen-pencil-260nw-215627647.jpg"
                  ></Image>
                )}
                {paymentType === "visa" && (
                  <Image
                    style={{
                      width: "400px",
                      border: "1px solid #ccc",
                      height: "200px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
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
                      placeholder="Card Code"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col lg={8} xs={24}>
        <div style={{ borderBottom: "2px solid #666" }}>
          <S.SectionHeading>
            <ShoppingCartOutlined />
            &nbsp;&nbsp;&nbsp;Your order
          </S.SectionHeading>
        </div>
        <Card size="small" style={{ marginBottom: 16 }}>
          {renderSelectedCarts()}
          <hr />
          <S.OrderSection label="Subtotal" span={3}>
            <S.OrderSectionTitle>Subtotal</S.OrderSectionTitle>
            <S.OrderSectionAmount>
              ${totalPrice.toFixed(2).toLocaleString()}
            </S.OrderSectionAmount>
          </S.OrderSection>
          <S.OrderSection>
            <S.OrderSectionTitle>Discount</S.OrderSectionTitle>
            <S.OrderSectionAmount>
              {discountInfo.data.code
                ? `- $${(totalPrice * (discountInfo.data.discountValue / 100))
                    .toFixed(2)
                    .toLocaleString()}`
                : "$0"}
            </S.OrderSectionAmount>
          </S.OrderSection>
          <S.OrderSection>
            <S.OrderSectionTitle>Total</S.OrderSectionTitle>
            <S.OrderSectionAmount>
              $
              {(
                totalPrice -
                (totalPrice * (discountInfo.data.discountValue / 100) || 0)
              )
                .toFixed(2)
                .toLocaleString()}
            </S.OrderSectionAmount>
          </S.OrderSection>
        </Card>
        <Button
          onClick={() => setCheckoutStep(0)}
          style={{ width: "100%", marginBottom: 8 }}
        >
          BACK
        </Button>
        <S.StepBtn
          type="primary"
          style={{ width: "100%", textTransform: "uppercase" }}
          onClick={() => infoForm.submit()}
        >
          Pay
        </S.StepBtn>
      </Col>
    </Row>
  );
};

export default Info;
