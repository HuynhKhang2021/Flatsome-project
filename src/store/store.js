import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import {
  cartReducer,
  productsReducer,
  categoryReducer,
  brandReducer,
  authReducer,
  commentReducer,
  discountReducer,
  addressReducer,
  orderReducer,
  favoriteReducer,
} from "../redux/reducers";
import rootSaga from "../redux/sagas";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    authReducer,
    productsReducer,
    categoryReducer,
    brandReducer,
    cartReducer,
    commentReducer,
    discountReducer,
    addressReducer,
    favoriteReducer,
    orderReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
