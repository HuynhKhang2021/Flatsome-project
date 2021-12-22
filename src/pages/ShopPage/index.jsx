import { useState, useEffect } from "react";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Select,
  Button,
  Space,
  Tag,
  Input,
  Slider,
  Checkbox,
  Spin,
  Skeleton,
} from "antd";

import ProductItem from "../../components/ProductItem";
import TopWrapper from "../../components/TopWrapper";

import {
  getCategoryListAction,
  getBrandListAction,
  getProductListAction,
} from "../../redux/actions";

import { PAGE_SIZE } from "../../constants/pagination";
import { BREADCRUMB, DEFAULT_PRICE_FILTER } from "./constans";

import * as S from "./styles";

const SearchPage = () => {
  const [keywordFilter, setKeywordFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState([
    DEFAULT_PRICE_FILTER[0],
    DEFAULT_PRICE_FILTER[1],
  ]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [sortFilter, setSortFilter] = useState("");

  const { productList } = useSelector((state) => state.productsReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { brandList } = useSelector((state) => state.brandReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getBrandListAction());
    dispatch(
      getProductListAction({ limit: PAGE_SIZE.USER_PRODUCT_SHOP, page: 1 })
    );
  }, []);

  const renderProductList = useMemo(() => {
    return productList?.data.map((item) => (
      <Col md={8} sm={12} xs={24} lg={6}>
        <ProductItem key={item.id} product={item} />
      </Col>
    ));
  }, [productList]);

  const filterByKeyword = (keyword) => {
    setKeywordFilter(keyword);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        categoryFilter,
        priceFilter,
        keyword: keyword,
        brandFilter,
        sortFilter,
      })
    );
  };

  const handleClearCategoryFilter = (categoryFilterItem) => {
    const newCategoryFilter = categoryFilter.filter(
      (item) => item.id !== categoryFilterItem.id
    );
    setCategoryFilter(newCategoryFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        categoryFilter: newCategoryFilter,
        priceFilter,
        keyword: keywordFilter,
        brandFilter,
        sortFilter,
      })
    );
  };

  const handleSelectCategoryFilter = (e) => {
    const { value, checked } = e.target;
    const newCategoryFilter = checked
      ? [...categoryFilter, value]
      : categoryFilter.filter(
          (categoryFilterItem, categoryFilterIndex) =>
            categoryFilterItem.id !== value.id
        );
    setCategoryFilter(newCategoryFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        categoryFilter: newCategoryFilter,
        keyword: keywordFilter,
        brandFilter,
        priceFilter,
        sortFilter,
      })
    );
  };

  const handleSelectBrandFilter = (e) => {
    const { value, checked } = e.target;
    const newBrandFilter = checked
      ? [...brandFilter, value]
      : brandFilter.filter(
          (brandFilterItem) => brandFilterItem.id !== value.id
        );
    setBrandFilter(newBrandFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        keyword: keywordFilter,
        categoryFilter,
        brandFilter: newBrandFilter,
        priceFilter,
        sortFilter,
      })
    );
  };

  const handleClearBrandFilter = (brandFilterItem) => {
    const newBrandFilter = brandFilter.filter(
      (item) => item.id !== brandFilterItem.id
    );
    setBrandFilter(newBrandFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        brandFilter: newBrandFilter,
        priceFilter,
        keyword: keywordFilter,
        categoryFilter,
        sortFilter,
      })
    );
  };

  const handleSelectPriceFilter = (values) => {
    setPriceFilter(values);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        categoryFilter,
        keyword: keywordFilter,
        brandFilter,
        priceFilter: values,
        sortFilter,
      })
    );
  };

  const handleClearPriceFilter = () => {
    setPriceFilter([DEFAULT_PRICE_FILTER[0], DEFAULT_PRICE_FILTER[1]]);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        keyword: keywordFilter,
        categoryFilter,
        brandFilter,
        sortFilter,
        priceFilter: [DEFAULT_PRICE_FILTER[0], DEFAULT_PRICE_FILTER[1]],
      })
    );
  };

  const renderCategoryList = useMemo(
    () =>
      categoryList?.data?.map((categoryItem, categoryIndex) => {
        const checked =
          categoryFilter.findIndex(
            (categoryFilterItem) => categoryFilterItem.id === categoryItem.id
          ) !== -1;
        return (
          <S.FilterItem key={categoryItem.id}>
            <Checkbox
              value={categoryItem}
              checked={checked}
              onChange={(e) => handleSelectCategoryFilter(e)}
              style={{ textTransform: "capitalize" }}
            >
              {categoryItem.name}
            </Checkbox>
          </S.FilterItem>
        );
      }),
    [categoryList.data, categoryFilter]
  );

  const renderCategoryFilterTag = useMemo(() => {
    return categoryFilter.map((categoryFilterItem) => (
      <Tag
        key={categoryFilterItem.id}
        closable
        onClose={() => handleClearCategoryFilter(categoryFilterItem)}
        style={{ textTransform: "capitalize" }}
      >
        {categoryFilterItem.name}
      </Tag>
    ));
  }, [categoryFilter]);

  const renderBrandFilterTag = useMemo(() => {
    return brandFilter.map((brandFilterItem) => (
      <Tag
        key={brandFilterItem.id}
        closable
        onClose={() => handleClearBrandFilter(brandFilterItem)}
        style={{ textTransform: "capitalize" }}
      >
        {brandFilterItem.name}
      </Tag>
    ));
  }, [brandFilter]);

  const handleClearKeywordFilter = () => {
    setKeywordFilter("");
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        keyword: "",
        categoryFilter,
        brandFilter,
        priceFilter,
        sortFilter,
      })
    );
  };

  const handleClearSortFilter = () => {
    setSortFilter("");
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        keyword: "",
        categoryFilter,
        brandFilter,
        priceFilter,
        sortFilter: "",
      })
    );
  };

  const handleSortFilter = (e) => {
    setSortFilter(e.value);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT_SHOP,
        page: 1,
        keyword: keywordFilter,
        categoryFilter,
        brandFilter,
        priceFilter,
        sortFilter: e.value,
      })
    );
  };

  const renderBrandList = useMemo(
    () =>
      brandList?.data?.map((brandItem, brandIndex) => {
        const checked =
          brandFilter.findIndex(
            (brandFilterItem) => brandFilterItem.id === brandItem.id
          ) !== -1;
        return (
          <S.FilterItem key={brandItem.id}>
            <Checkbox
              value={brandItem}
              checked={checked}
              onChange={(e) => handleSelectBrandFilter(e)}
              style={{ textTransform: "capitalize" }}
            >
              {brandItem.name}
            </Checkbox>
          </S.FilterItem>
        );
      }),
    [brandList.data, brandFilter]
  );

  return (
    <S.ShopWrapper>
      <TopWrapper breadcrumb={BREADCRUMB} />
      <S.ShopPageContainer>
        <Row gutter={[16, 16]}>
          <Col sm={{ span: 24, order: 1 }} md={{ span: 18, order: 1 }} lg={18}>
            <S.ProductListContainer>
              <div style={{ display: "flex", marginBottom: "1rem" }}>
                <Select
                  labelInValue
                  defaultValue={sortFilter}
                  value={sortFilter}
                  allowClear
                  placeholder="Sort by..."
                  style={{ width: 290 }}
                  onChange={(value) => handleSortFilter(value)}
                >
                  <Select.Option value="asc">Low to high price</Select.Option>
                  <Select.Option value="desc">High to low price</Select.Option>
                </Select>
                <Input.Search
                  id="inputSearch"
                  placeholder="Search..."
                  onChange={(e) => filterByKeyword(e.target.value)}
                  // style={{ marginBottom: "2rem", flex:1 }}
                />
              </div>
              {(categoryFilter.length > 0 ||
                brandFilter.length > 0 ||
                sortFilter ||
                priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
                priceFilter[1] !== DEFAULT_PRICE_FILTER[1] ||
                keywordFilter) && (
                <Space style={{ marginBottom: ".5rem" }}>
                  {categoryFilter && renderCategoryFilterTag}
                  {brandFilter && renderBrandFilterTag}
                  {(priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
                    priceFilter[1] !== DEFAULT_PRICE_FILTER[1]) && (
                    <Tag
                      closable
                      onClose={handleClearPriceFilter}
                    >{`Price: ${priceFilter[0].toLocaleString()}$ - ${priceFilter[1].toLocaleString()}$`}</Tag>
                  )}
                  {keywordFilter && (
                    <Tag
                      closable
                      onClose={handleClearKeywordFilter}
                    >{`Keyword: ${keywordFilter}`}</Tag>
                  )}
                  {sortFilter && (
                    <Tag closable onClose={handleClearSortFilter}>{`Sort: ${
                      sortFilter.value === "desc"
                        ? "Low to high price"
                        : "High to low price"
                    }`}</Tag>
                  )}
                </Space>
              )}

              <h2>There are {productList?.meta.total} products</h2>
              <Row
                // style={{ paddingRight: "1rem" }}
                className="search-products"
                gutter={[8, 12]}
              >
                {productList.loading && (
                  <Spin style={{ width: "100%" }} size="large" />
                )}
                {renderProductList}
              </Row>
              {productList?.data.length !== productList?.meta.total && (
                <Row
                  justify="center"
                  style={{ marginTop: 16, marginBottom: 16 }}
                >
                  <Button
                    onClick={() =>
                      dispatch(
                        getProductListAction({
                          limit: PAGE_SIZE.USER_PRODUCT_SHOP,
                          page: productList?.meta?.page + 1,
                          categoryFilter,
                          keyword: keywordFilter,
                          priceFilter,
                          brandFilter,
                          sortFilter,
                          more: true,
                        })
                      )
                    }
                  >
                    Show more
                  </Button>
                </Row>
              )}
            </S.ProductListContainer>
          </Col>
          <Col sm={{ span: 24, order: 0 }} md={{ span: 6, order: 1 }} lg={6}>
            <S.FilterContainer>
              <S.FilterTitle>type</S.FilterTitle>
              <S.FilterSectionContainer>
                {categoryList.loading && <Skeleton active paragraph={{ rows: 4 }} />}
                {renderCategoryList}
              </S.FilterSectionContainer>

              <S.FilterTitle>brand</S.FilterTitle>
              <S.FilterSectionContainer>
              {brandList.loading && <Skeleton active paragraph={{ rows: 4 }} />}
                {renderBrandList}
              </S.FilterSectionContainer>

              <S.FilterTitle>price</S.FilterTitle>
              <S.FilterSectionContainer>
                <Slider
                  range
                  min={DEFAULT_PRICE_FILTER[0]}
                  max={DEFAULT_PRICE_FILTER[1]}
                  step={50}
                  defaultValue={[
                    DEFAULT_PRICE_FILTER[0],
                    DEFAULT_PRICE_FILTER[1],
                  ]}
                  value={[priceFilter[0], priceFilter[1]]}
                  onChange={(value) => {
                    handleSelectPriceFilter(value);
                  }}
                />
                <Space
                  align="center"
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <S.FilterNumber style={{ marginLeft: "auto" }}>
                    <Space align="center">
                      <p style={{ marginBottom: 0 }}>Price:</p>
                      <h4 style={{ marginBottom: 0, fontWeight: "700" }}>
                        {`${priceFilter[0].toLocaleString()}$ - ${priceFilter[1].toLocaleString()}$`}
                      </h4>
                    </Space>
                  </S.FilterNumber>
                </Space>
              </S.FilterSectionContainer>
            </S.FilterContainer>
          </Col>
        </Row>
      </S.ShopPageContainer>
    </S.ShopWrapper>
  );
};

export default SearchPage;
