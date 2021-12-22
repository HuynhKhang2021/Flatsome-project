import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  InputNumber,
  Button,
  Row,
  Col,
  Descriptions,
  Input,
  Image,
  Space,
  Checkbox,
  notification,
  Result,
} from "antd";
import {
  DeleteOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import {
  updateCartProductAction,
  removeCartProductAction,
  selectCartProductAction,
  checkDiscountAction,
} from "../../../../redux/actions";
import * as S from "../../styles";

import { COLOR } from "../../../../constants/color";
import { ROUTER } from "../../../../constants/router";

const Checkout = ({ setCheckoutStep }) => {
  let totalPrice = 0;
  const [discountCode, setDiscountCode] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cartReducer);
  const { selectedCart } = useSelector((state) => state.cartReducer);
  const { discountInfo } = useSelector((state) => state.discountReducer);

  const handleSelectCart = (e, item) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(selectCartProductAction([...selectedCart, item]));
    } else {
      const newCartedSelect = selectedCart.filter(
        (selectCartItem) => selectCartItem.id !== item.id
      );
      dispatch(selectCartProductAction(newCartedSelect));
    }
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(selectCartProductAction([...cartList.data]));
    } else {
      dispatch(selectCartProductAction([]));
    }
  };

  // const handleDeleteAll = () => {
  //   if (selectedCart.length === 0)
  //     notification.info({
  //       message: "Please choose something to remove!!!",
  //     });
  //   selectedCart.forEach((selectedCartItem) => {
  //     dispatch(
  //       removeCartProductAction({
  //         id: selectedCartItem.id,
  //       })
  //     );
  //     dispatch(selectCartProductAction([]));
  //   });
  // };

  const handleChangeQuantity = (id, quantity) => {
    dispatch(
      updateCartProductAction({
        data: { id, quantity },
      })
    );
  };

  const handleCheckDiscount = () => {
    dispatch(checkDiscountAction({ code: discountCode }));
  };

  const handleConfirmCart = () => {
    if (!selectedCart.length) {
      notification.error({
        message: "Bạn chưa chọn sản phẩm để mua!",
      });
    } else {
      setCheckoutStep(1);
    }
  };

  const renderCartList = () => {
    return cartList.data?.map((cartItem) => {
      const isChecked =
        selectedCart.findIndex(
          (selectCartItem) => selectCartItem.id === cartItem.id
        ) !== -1;
      const unitPrice = cartItem.option
        ? cartItem.product?.price + cartItem.option?.price
        : cartItem.product?.price;
      const cartItemPrice = unitPrice * cartItem.quantity;
      totalPrice += isChecked ? cartItemPrice : 0;

      return (
        <Card key={cartItem.id} size="small" style={{ marginBottom: 8 }}>
          <Row align="middle">
            <Col span={1}>
              <Checkbox
                onChange={(e) => handleSelectCart(e, cartItem)}
                checked={isChecked}
              />
            </Col>
            <Col span={12}>
              <Space size={16} style={{ width: "100%" }}>
                <Image
                  src={cartItem.product?.imageList[0]}
                  alt={cartItem.product?.name}
                  width={100}
                  height={100}
                  style={{ border: "1px solid #ccc", objectFit: "contain" }}
                />
                <div style={{ position: "relative", width: "90%" }}>
                  <h4 style={{ top: 0 }}>{cartItem.product?.name}</h4>
                  {cartItem.option && (
                    <S.CartItemOptionName>
                      {cartItem.option.name}
                    </S.CartItemOptionName>
                  )}
                </div>
              </Space>
            </Col>
            <Col span={3}>
              <span style={{ fontWeight: "bold", color: COLOR.MAIN_COLOR }}>
                ${unitPrice.toLocaleString()}
              </span>
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                value={cartItem.quantity}
                onChange={(value) => handleChangeQuantity(cartItem.id, value)}
                style={{width:'70%'}}
              />
            </Col>
            <Col span={3}>
              <span style={{ fontWeight: "bold", color: COLOR.MINOR_COLOR }}>
                ${cartItemPrice.toLocaleString()}
              </span>
            </Col>
            <Col span={1}>
              <Button
                danger
                // type="text"
                onClick={() =>
                  dispatch(
                    removeCartProductAction({ id: parseInt(cartItem.id) })
                  )
                }
                icon={<DeleteOutlined />}
              ></Button>
            </Col>
          </Row>
        </Card>
      );
    });
  };

  return (
    <Row gutter={16} style={{ marginBottom: "1rem" }}>
      {cartList.data.length === 0 ? (
        <Card size="small" style={{ margin: "auto" }}>
          <Result
            icon={<Image src="https://bizweb.dktcdn.net/100/351/215/themes/713955/assets/empty-cart.png?1617619216743" />}
            title="Your cart is empty!"
            extra={
              <S.StepBtn
                type="primary"
                onClick={() => history.push(ROUTER.SHOP)}
              >
                shopping
              </S.StepBtn>
            }
          />
        </Card>
      ) : (
        <>
          <Col lg={16} xs={24}>
            <div style={{ borderBottom: "2px solid #666" }}>
              <S.SectionHeading>
                <ShoppingCartOutlined />
                &nbsp;&nbsp;&nbsp;Your cart
              </S.SectionHeading>
            </div>
            <Card size="small" style={{ marginBottom: 16 }}>
              <Row align="middle">
                <Col span={1}></Col>
                <Col span={12}>
                  <S.TitleText>Product Name</S.TitleText>
                </Col>
                <Col span={3}>
                  <S.TitleText>Price</S.TitleText>
                </Col>
                <Col span={4}>
                  <S.TitleText>Quantity</S.TitleText>
                </Col>
                <Col span={3}>
                  <S.TitleText>Subtotal</S.TitleText>
                </Col>
                <Col span={1}></Col>
              </Row>
            </Card>
            {renderCartList()}
            <Row>
              <Card size="small" style={{ width: "100%" }}>
                <Checkbox
                  onChange={(e) => handleSelectAll(e)}
                  indeterminate={
                    selectedCart.length > 0 &&
                    selectedCart.length !== cartList.data.length
                  }
                  checked={selectedCart.length === cartList.data.length}
                  disabled={!cartList.data.length}
                >
                  Select all
                </Checkbox>
                <Button
                  danger
                  type="button"
                  // onClick={() => handleDeleteAll()}
                  icon={<DeleteOutlined />}
                >
                  Delete
                </Button>
              </Card>
            </Row>
          </Col>
          <Col lg={8} xs={24}>
            <div style={{ borderBottom: "2px solid #666" }}>
              <S.SectionHeading>
                <ShoppingCartOutlined />
                &nbsp;&nbsp;&nbsp;Your order
              </S.SectionHeading>
            </div>
            <Card size="small" style={{ marginBottom: "16px" }}>
              <S.OrderSection label="Subtotal" span={3}>
                <S.OrderSectionTitle>Subtotal</S.OrderSectionTitle>
                <S.OrderSectionAmount>
                  ${totalPrice.toLocaleString()}
                </S.OrderSectionAmount>
              </S.OrderSection>
              <S.OrderSection>
                <S.OrderSectionTitle>Discount</S.OrderSectionTitle>
                <S.OrderSectionAmount>
                  {discountInfo.data.code
                    ? `- $${(
                        totalPrice *
                        (discountInfo.data.discountValue / 100)
                      ).toLocaleString()}`
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
                  ).toLocaleString()}
                </S.OrderSectionAmount>
              </S.OrderSection>
            </Card>
            <div style={{ borderBottom: "2px solid #666" }}>
              <S.SectionHeading>
                <TagOutlined />
                &nbsp;&nbsp;&nbsp;Coupon code
              </S.SectionHeading>
            </div>
            <Card size="small">
              <Input.Group compact>
                <Input
                  style={{ width: "calc(100% - 100px)" }}
                  placeholder="Coupon Code"
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button
                  type="primary"
                  style={{
                    width: 100,
                    backgroundColor: COLOR.MINOR_COLOR,
                    borderColor: COLOR.MINOR_COLOR,
                  }}
                  onClick={() => handleCheckDiscount()}
                >
                  Confirm
                </Button>
              </Input.Group>
              {discountInfo.data.code && (
                <S.DiscountCard>
                  <S.DiscountInfo>
                    <p>{discountInfo.data.name}</p>
                    <span>{discountInfo.data.code}</span>
                  </S.DiscountInfo>
                  <S.DiscountValue>
                    {discountInfo.data.discountType === "percent"
                      ? `${discountInfo.data.discountValue}%`
                      : `$${discountInfo.data.discountValue.toLocaleString()}`}
                  </S.DiscountValue>
                </S.DiscountCard>
              )}
            </Card>
            <S.StepBtn
              type="primary"
              style={{ width: "100%", marginTop: "1rem" }}
              onClick={() => handleConfirmCart()}
            >
              Continue
            </S.StepBtn>
          </Col>
        </>
      )}
    </Row>
  );
};

export default Checkout;
