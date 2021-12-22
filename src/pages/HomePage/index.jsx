import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductListAction } from "../../redux/actions";

import Slider from "./Slider/Slider";
import Banners from "./Banners";
import Products from "./Products";
import NewLetters from "./NewLetters";

const HomePage = () => {
  const [phoneList, setPhoneList] = useState([]);
  const [laptopList, setLaptopList] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const { productList } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProductListAction({
        limit: 100,
        page: 1,
      })
    );
  }, []);
  useEffect(() => {
    if (productList) {
      const newProductList = [...productList.data];
      const phoneList = newProductList?.filter(
        (item) => item.category.name === "phone"
      ).slice(0,6);
      const laptopList = newProductList?.filter(
        (item) => item.category.name === "laptop"
      ).slice(0,6);
      const featuredList = newProductList?.filter(
        (item) => item.isFeatured === true
      ).slice(0,6);
      setPhoneList(phoneList);
      setLaptopList(laptopList);
      setFeaturedList(featuredList);
    }
  }, [productList]);

  return (
    <div>
      <Slider></Slider>
      <Products title="FEATURED" listProduct={featuredList} />
      <Banners />
      <Products title="PHONE" listProduct={phoneList} />
      <NewLetters />
      <Products title="LAPTOP" listProduct={laptopList} />
    </div>
  );
};

export default HomePage;
