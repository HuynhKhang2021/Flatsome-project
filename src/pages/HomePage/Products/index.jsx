import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Spin } from "antd";

import ProductItem from "../../../components/ProductItem";

import * as S from "./styles";

const ProductsList = ({ title, listProduct }) => {
  const { productList } = useSelector((state) => state.productsReducer);
  const renderProductList = useMemo(() => {
    return listProduct?.map((product) => {
      return (
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 4 }}
        >
          <ProductItem key={product.id} product={product} />
        </Col>
      );
    });
  }, [listProduct]);

  return (
    <S.ProductFeaturedContainer>
      <S.TitleDivider style={{ overflow: "hidden" }}>
        <S.Title>{title}</S.Title>
      </S.TitleDivider>
      <S.ProductList style={{ padding: "1rem" }}>
        <Row gutter={[8, 20]}>
          {productList.loading && <Spin style={{width:'100%'}} size="large"/>}
          {renderProductList}
        </Row>
      </S.ProductList>
    </S.ProductFeaturedContainer>
  );
};

export default ProductsList;
