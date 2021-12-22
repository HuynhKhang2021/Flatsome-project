import "antd/dist/antd.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Rate,
  Space,
  Radio,
  InputNumber,
  Card,
  Descriptions,
  notification,
  List,
  Comment,
  Divider,
  Image,
  Spin,
  Skeleton,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  BarsOutlined,
  HddOutlined,
  HeartFilled,
} from "@ant-design/icons";

import TopWrapper from "../../components/TopWrapper";

import { BREADCRUMB } from "./constant";

import {
  getProductListAction,
  getProductDetailAction,
  getCommentListAction,
  postCommentAction,
  addToCartAction,
  updateCartProductAction,
  likeProductAction,
  dislikeProductAction,
} from "../../redux/actions";

import { ROUTER } from "../../constants/router";

import * as S from "./styles.js";
import moment from "moment";
import { COLOR } from "../../constants/color";

// const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const ProductDetail = () => {
  const [productsRelated, setProductsRelated] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [isComment, setIsReview] = useState(false);
  const [indexOfImg, setIndexOfImg] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isShowDetailInfo, setIsShowDetailInfo] = useState(true);
  const [favoriteProduct, setFavoriteProduct] = useState({});

  const [commentForm] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  const { productList } = useSelector((state) => state.productsReducer);
  const { productDetail } = useSelector((state) => state.productsReducer);
  const { commentList, actionLoading } = useSelector(
    (state) => state.commentReducer
  );
  const { userInfo } = useSelector((state) => state.authReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(getProductListAction({ limit: 100, page: 1 }));
  }, []);

  const foundProductsRelated = useCallback(() => {
    const productsRelated = productList?.data?.filter(
      (item) =>
        item?.category?.name === productDetail?.data?.category?.name &&
        item.id !== productDetail?.data.id
    );
    setProductsRelated(productsRelated);
  }, [productList, productDetail]);

  const renderProductsRelated = productsRelated?.map((productItem) => (
    <S.ProductsRelatedItem
      onClick={() =>
        history.push(
          generatePath(ROUTER.PRODUCT_DETAIL, { productId: productItem.id })
        )
      }
      size="small"
      key={productItem.id}
      style={{ marginBottom: "1rem", position: "relative" }}
    >
      <Space>
        <img src={productItem.imageList[0]} alt="" style={{ width: "100px" }} />
        <div>
          <p>{productItem.name}</p>
          <h3 style={{ fontWeight: "bold", color: COLOR.MINOR_COLOR }}>
            ${productItem.price}
          </h3>
          <S.ProductsRelatedName>
            {productItem.brand.name}
          </S.ProductsRelatedName>
        </div>
      </Space>
    </S.ProductsRelatedItem>
  ));

  useEffect(() => {
    if (productDetail.data.id) {
      foundProductsRelated();
    }
  }, [foundProductsRelated, productDetail.data.id]);

  useEffect(() => {
    if (params.productId) {
      dispatch(getProductDetailAction({ id: params.productId }));
      dispatch(getCommentListAction({ productId: params.productId }));
      const favoriteProduct = productDetail.data.favorites?.find(
        (favoriteItem) => favoriteItem.id === params.productId
      );
      setFavoriteProduct(favoriteProduct);
    }
  }, [params.productId]);

  const renderProductRate = () => {
    let total = 0;
    if (commentList.data?.length) {
      commentList.data.forEach((item) => {
        total += item.rate;
      });
      return (total / commentList.data.length).toFixed(1);
    }
    return 0;
  };

  const getProductOptions = useMemo(() => {
    if (productDetail?.data.options?.length) {
      return productDetail.data.options.map((option) => {
        return (
          <Radio.Button
            key={option.id}
            value={option}
            style={{ marginRight: "1rem", width: "85px" }}
          >
            {option.name}
          </Radio.Button>
        );
      });
    }
  }, [productDetail.data]);

  const handleSubmitComment = (value) => {
    renderProductRate();
    const isExist =
      commentList.data.findIndex(
        (commentItem) => commentItem.userId === userInfo.data.id
      ) !== -1;
    if (isExist) {
      notification.warning({
        message: "You alredy commented before!",
      });
      commentForm.resetFields();
    } else {
      dispatch(
        postCommentAction({
          ...value,
          userId: userInfo.data.id,
          productId: params.productId,
        })
      );
      commentForm.resetFields();
    }
  };
  const handleAddToCart = () => {
    if (userInfo.data?.id) {
      if (productDetail?.data.options.length) {
        if (!selectedOption) {
          notification.error({
            message: "Please choose type of item",
          });
        } else {
          const existCartProduct = cartList.data.find(
            (item) => item.optionId === selectedOption.id
          );
          if (existCartProduct) {
            dispatch(
              updateCartProductAction({
                data: {
                  id: existCartProduct.id,
                  quantity: existCartProduct.quantity + productQuantity,
                },
                callback: {
                  showSuccess: () =>
                    notification.success({
                      message: "Updating product in cart is success",
                    }),
                },
              })
            );
          } else {
            dispatch(
              addToCartAction({
                quantity: productQuantity,
                productId: parseInt(params.productId),
                optionId: selectedOption.id,
                userId: userInfo.data.id,
              })
            );
          }
        }
      } else {
        const existCartProduct = cartList.data?.find(
          (item) => item.productId === parseInt(params.productId)
        );
        if (existCartProduct) {
          dispatch(
            updateCartProductAction({
              data: {
                id: existCartProduct.id,
                quantity: existCartProduct.quantity + productQuantity,
              },
              callback: {
                showSuccess: () =>
                  notification.success({
                    message: "Updating product in cart is success",
                  }),
              },
            })
          );
        } else {
          dispatch(
            addToCartAction({
              quantity: productQuantity,
              productId: parseInt(params.productId),
              optionId: -1,
              userId: userInfo.data.id,
            })
          );
        }
      }
    } else {
      notification.error({
        message: "You need to login to do this",
      });
    }
  };

  const handleClickLikeBtn = () => {
    if (!!userInfo.data?.id) {
      if (!!favoriteProduct) {
        dispatch(
          dislikeProductAction({
            id: favoriteProduct.id,
          })
        );
      } else {
        dispatch(
          likeProductAction({
            productId: parseInt(params.productId),
            userId: userInfo.data.id,
          })
        );
      }
    } else {
      notification.error({
        message: "You have to login!",
      });
    }
  };

  return (
    <>
      <TopWrapper
        breadcrumb={
          [
            ...BREADCRUMB,
            {
              title: productDetail.data.name,
            },
          ]
        }
        height={80}
        style={{ marginTop: "110px" }}
      ></TopWrapper>
      <S.ProductDetailContainer>
        <S.ProductDetail>
          {productDetail.data && (
            <S.Product className="row">
              <Row gutter={[32, 16]}>
                <Col span={24} lg={{ span: 10 }}>
                  <S.ProductImages className="col-6">
                    {productDetail.loading ? (
                      <Skeleton.Image
                        style={{
                          width: "100%",
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        size="large"
                      />
                    ) : (
                      <S.ProductMainImage
                        src={
                          productDetail?.data?.imageList &&
                          productDetail?.data?.imageList[indexOfImg]
                        }
                      ></S.ProductMainImage>
                    )}
                    {/* <S.ListImagesContainer> */}
                    <S.ListImages>
                      <Slider {...settings}>
                        {/* {productDetail?.data?.imageList &&
                            productDetail?.data?.imageList.map(
                              (item, index) => (
                                <div key={index}>
                                <img
                                  onClick={() => setIndexOfImg(index)}
                                  // key={index}
                                  src={item}
                                  alt="Some Thing"
                                /></div>
                              )
                            )} */}
                      </Slider>
                    </S.ListImages>
                    {/* </S.ListImagesContainer> */}
                  </S.ProductImages>
                </Col>
                <Col span={24} lg={{ span: 14 }}>
                  <S.ProductContent>
                    {productDetail.loading ? (
                      <Skeleton active paragraph={{ rows: 7 }} />
                    ) : (
                      <>
                        <S.ProductName>
                          {productDetail?.data?.name}
                        </S.ProductName>
                        <Space align="baseline">
                          <Rate
                            disabled
                            allowHalf
                            value={renderProductRate()}
                          />
                          <h3>
                            {renderProductRate()} ({commentList.data?.length}{" "}
                            Reviews)
                          </h3>
                        </Space>
                        <Space align="baseline">
                          <S.ProductPrice>
                            ${productDetail?.data?.price?.toLocaleString()}
                          </S.ProductPrice>
                          <p
                            style={{
                              fontSize: "1.2rem",
                              textDecoration: "line-through",
                            }}
                          >
                            $
                            {(
                              productDetail?.data?.price +
                              productDetail?.data?.oldPrice
                            ).toLocaleString()}
                          </p>
                        </Space>
                        <S.DiscountRemind>
                          Enter discount code to get coupon $10
                        </S.DiscountRemind>
                        {productDetail.data.options?.length > 0 && (
                          <Row style={{ marginBottom: "1rem" }}>
                            <Col lg={8} md={12} sm={12} xs={12}>
                              <S.ProductLabel>Memory:</S.ProductLabel>
                            </Col>
                            <Col lg={16} md={12} sm={12} xs={12}>
                              <Radio.Group
                                onChange={(e) =>
                                  setSelectedOption(e.target.value)
                                }
                                optionType="button"
                              >
                                {getProductOptions}
                              </Radio.Group>
                            </Col>
                          </Row>
                        )}
                        <Row>
                          <Col lg={8} md={12} sm={12} xs={12}>
                            <S.ProductLabel>Brand:</S.ProductLabel>
                          </Col>
                          <Col lg={16} md={12} sm={12} xs={12}>
                            <S.ProductBrandName>
                              {productDetail.data.brand?.name}
                            </S.ProductBrandName>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={8} md={12} sm={12} xs={12}>
                            <S.ProductLabel>Quantity:</S.ProductLabel>
                          </Col>
                          <Col lg={16} md={12} sm={12} xs={12}>
                            <InputNumber
                              min={1}
                              max={10}
                              value={productQuantity}
                              onChange={(value) => setProductQuantity(value)}
                              style={{ height: "41px", borderRadius: "4px" }}
                            />
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "1rem" }}>
                          <Col lg={8} md={12} sm={12} xs={12}>
                            <Button
                              size="large"
                              type="primary"
                              icon={<ShoppingCartOutlined />}
                              onClick={() => handleAddToCart()}
                            >
                              Add to cart
                            </Button>
                          </Col>
                          <Col lg={16} md={12} sm={12} xs={12}>
                            <Button
                              type="button"
                              size="large"
                              danger={!!favoriteProduct}
                              icon={
                                !!favoriteProduct ? (
                                  <HeartFilled style={{ color: "red" }} />
                                ) : (
                                  <HeartOutlined />
                                )
                              }
                              onClick={() => handleClickLikeBtn()}
                            >
                              Like
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}

                    <Divider />
                    <S.ProductPolicy>
                      <div style={{ borderBottom: "2px solid #666" }}>
                        <S.SectionHeading>
                          <ShoppingCartOutlined />
                          &nbsp;&nbsp;&nbsp;Policy
                        </S.SectionHeading>
                      </div>
                      <S.ProductPolicyContent>
                        <p>
                          <i class="fab fa-accessible-icon"></i>Free ship to
                          customer within 5km
                        </p>
                        <p>
                          <i class="fas fa-rocket"></i>Return item easily within
                          2 hours
                        </p>
                        <p>
                          <i class="fas fa-shipping-fast"></i>Order item before
                          afternoon to ship in this day
                        </p>
                      </S.ProductPolicyContent>
                    </S.ProductPolicy>
                    <Divider />
                    <S.ContentFooter>
                      <p>Category: {productDetail?.data.type}</p>
                      <div>
                        <a
                          href="https://www.facebook.com/kenny.nguyen.7564129"
                          style={{
                            backgroundColor: COLOR.MAIN_COLOR,
                            marginRight: "1rem",
                            borderRadius: "4px",
                          }}
                        >
                          <i class="fab fa-facebook"></i>
                        </a>
                        <a
                          href="https://twitter.com/"
                          style={{
                            backgroundColor: COLOR.MAIN_COLOR,
                            marginRight: "1rem",
                            borderRadius: "4px",
                          }}
                        >
                          <i class="fab fa-twitter"></i>
                        </a>
                        <a
                          href="https://mail.google.com/mail/u/2/#inbox"
                          style={{
                            backgroundColor: COLOR.MAIN_COLOR,
                            marginRight: "1rem",
                            borderRadius: "4px",
                          }}
                        >
                          <i class="far fa-envelope"></i>
                        </a>
                      </div>
                    </S.ContentFooter>
                  </S.ProductContent>
                </Col>
              </Row>
            </S.Product>
          )}
        </S.ProductDetail>
        <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
          <Col lg={16} md={16} sm={24}>
            <div style={{ borderBottom: "2px solid #666" }}>
              <S.InformationHeading
                onClick={() => setIsShowDetailInfo(true)}
                active={isShowDetailInfo ? true : false}
              >
                <BarsOutlined /> Detailed Information
              </S.InformationHeading>
              <S.InformationHeading
                onClick={() => setIsShowDetailInfo(false)}
                active={isShowDetailInfo ? false : true}
              >
                <HddOutlined /> Specification
              </S.InformationHeading>
            </div>
            {isShowDetailInfo ? (
              <Card>
                <S.DetailInformation
                  dangerouslySetInnerHTML={{
                    __html: productDetail.data?.detailInformation,
                  }}
                ></S.DetailInformation>
              </Card>
            ) : (
              <Card>
                {/* <div dangerouslySetInnerHTML={{__html: productDetail.data?.specifications}}></div> */}
                <Descriptions bordered size="small">
                  <Descriptions.Item label="Product" span={3}>
                    Cloud Database
                  </Descriptions.Item>
                  <Descriptions.Item label="Billing" span={3}>
                    Prepaid
                  </Descriptions.Item>
                  <Descriptions.Item label="time" span={3}>
                    18:00:00
                  </Descriptions.Item>
                  <Descriptions.Item label="Amount" span={3}>
                    $80.00
                  </Descriptions.Item>
                  <Descriptions.Item label="Disquantity" span={3}>
                    $20.00
                  </Descriptions.Item>
                  <Descriptions.Item label="Official" span={3}>
                    $60.00
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            )}
          </Col>
          <Col lg={8} md={8} sm={24}>
            <div style={{ borderBottom: "2px solid #666" }}>
              <S.InformationHeading active={true}>
                <BarsOutlined /> Related Product
              </S.InformationHeading>
            </div>
            <Card size="small">{renderProductsRelated}</Card>
          </Col>
        </Row>
        <Card>
          <S.ProductFeedBack>
            <Row style={{ transition: "all ease 0.5s" }}>
              <Col
                span={24}
                lg={{ span: 6 }}
                style={{ borderRight: "1px solid #ccc" }}
              >
                <S.FeedBackTabs className="col-lg-3 mr-0">
                  <S.TabHeading
                    onClick={() => setIsReview(false)}
                    active={!isComment}
                  >
                    <i class="fas fa-prescription-bottle"></i> description
                  </S.TabHeading>
                  <S.TabHeading
                    onClick={() => setIsReview(true)}
                    active={isComment}
                  >
                    <i class="far fa-thumbs-up"></i> reviews(
                    {commentList.data?.length})
                  </S.TabHeading>
                </S.FeedBackTabs>
              </Col>
              <Col span={24} lg={{ span: 18 }}>
                <S.FeedBackContent>
                  <h2 style={{ fontWeight: "bold" }}>
                    {isComment ? "Review" : "Description"}
                  </h2>
                  {!isComment && productDetail?.data?.description}

                  {isComment && (
                    <>
                      {userInfo.data && (
                        <Form
                          form={commentForm}
                          name="basic"
                          labelCol={{ span: 4 }}
                          wrapperCol={{ offset: 1, span: 19 }}
                          initialValues={{ rate: 0, content: "" }}
                          onFinish={(values) => handleSubmitComment(values)}
                          // onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Your rating"
                            name="rate"
                            rules={[{ required: true, message: "Required!" }]}
                          >
                            {/* <p>Your rating*</p> */}
                            <Rate allowHalf />
                          </Form.Item>
                          <Form.Item
                            label="Your Comment"
                            name="content"
                            rules={[
                              {
                                required: true,
                                message: "Please input your review!",
                              },
                            ]}
                          >
                            <Input.TextArea />
                          </Form.Item>

                          <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={actionLoading.postComment}
                            >
                              Add your review
                            </Button>
                          </Form.Item>
                        </Form>
                      )}
                      <Card style={{ marginTop: "1rem" }}>
                        <List
                          className="comment-list"
                          // header={`${commentList.data.length} reviews`}
                          // itemLayout="horizontal"
                          dataSource={commentList?.data}
                          // dataSource={[{name: 'Khang', rate: 5, content:'Sao ma ko ra'}]}
                          renderItem={(item) => (
                            <li key={item.user.id}>
                              <Comment
                                author={item.user?.username}
                                content={
                                  <div>
                                    <Rate
                                      disabled
                                      style={{ fontSize: 14 }}
                                      allowHalf
                                      value={item.rate}
                                    />
                                    <p>{item.content}</p>
                                  </div>
                                }
                                datetime={moment(item.createdAt).fromNow()}
                              />
                            </li>
                          )}
                        />
                      </Card>
                    </>
                  )}
                </S.FeedBackContent>
              </Col>
            </Row>
          </S.ProductFeedBack>
        </Card>
      </S.ProductDetailContainer>
    </>
  );
};

export default ProductDetail;
