import { fork } from "redux-saga/effects";

import authSaga from "./auth.saga";
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import brandSaga from "./brand.saga";
import commentSaga from "./comment.saga";
import cartSaga from "./cart.saga";
import discountSaga from "./discount.saga";
import orderSaga from "./order.saga";
import addressSaga from "./address.saga";
import favoriteSaga from "./favorite.saga";

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(brandSaga);
  yield fork(commentSaga);
  yield fork(cartSaga);
  yield fork(discountSaga);
  yield fork(orderSaga);
  yield fork(addressSaga);
  yield fork(favoriteSaga);
}
