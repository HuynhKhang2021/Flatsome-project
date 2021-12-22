import "./global.scss";
import "antd/dist/antd.css";
import "./assets/fonts/fontawesome-free-5.15.3-web/css/all.min.css";

import jwtDecode from "jwt-decode";

import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { ROUTER } from "./constants/router";
import { useSelector, useDispatch } from "react-redux";

import { NavBar, Header, Footer } from "./Layout";
import AuthForm from "./components/AuthForm/AuthForm";
import {
  PaymentPage,
  HomePage,
  ShopPage,
  ProductDetail,
  Profile,
} from "./pages";

import { getUserInfoAction, getFavoriteListAction } from "./redux/actions";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { productList } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      const decodedUserData = jwtDecode(userInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
  }, []);

  useEffect(() => {
    dispatch(getFavoriteListAction());
  }, []);

  return (
    <div className="app ">
      {showLogin && (
        <AuthForm
          setShowLogin={setShowLogin}
          onCloseLogin={() => {
            setShowLogin(false);
          }}
        />
      )}
      <Header />
      <NavBar
        className="nav"
        // productsList={productList.data}
        onShowLogin={() => {
          setShowLogin(true);
        }}
      />
      <Switch>
        <Route path="/home" exact>
          <Redirect to={ROUTER.HOME} />{" "}
          {/* Redirect để trỏ trực tiếp đến trang chỉ định */}
        </Route>
        <Route path={ROUTER.HOME} exact>
          <HomePage />
        </Route>
        <Route path={ROUTER.CART} exact>
          <PaymentPage />
        </Route>
        {/* <RouteWithFilter
          path={ROUTER.PRODUCT_DETAIL}
          exact
          component={ProductDetail}
        /> */}

        <Route path={ROUTER.PRODUCT_DETAIL} exact>
          <ProductDetail />
        </Route>
        <Route path={ROUTER.PROFILE} exact>
          <Profile />
        </Route>

        <Route path={ROUTER.SHOP} exact>
          <ShopPage productsList={productList.data} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
