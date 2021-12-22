import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAIL, CART_ACTION } from "../constants";
import { notification } from "antd";

function* getCartListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get("http://localhost:5000/carts?_expand=product&_expand=option", {
      params: {
        userId,
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.GET_CART_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    put({
      type: FAIL(CART_ACTION.GET_CART_LIST),
      payload: {
        error,
      },
    });
  }
}
function* addToCartSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.post(
      "http://localhost:5000/carts",
      action.payload
    );
    yield put({
      type: REQUEST(CART_ACTION.GET_CART_LIST),
      payload: {
        userId,
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.ADD_TO_CART),
      payload: {
        data: result.data,
      },
    });
    notification.success({
      message: "Adding the product to cart is success!",
    });
  } catch (error) {
    // yield put({
    //   type: FAIL(CART_ACTION.ADD_TO_CART),
    //   payload: {
    //     error,
    //   },
    // });
    notification.error({ message: error });
  }
}
function* removeCartProductSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.delete(`http://localhost:5000/carts/${id}`);
    console.log("🚀 ~ file: cart.saga.js ~ line 66 ~ function*removeCartProductSaga ~ result", result)
    yield put({
      type: SUCCESS(CART_ACTION.REMOVE_CART_PRODUCT),
      payload: { data: {id} },
    });
  } catch (error) {
    yield put({
      type: FAIL(CART_ACTION.REMOVE_CART_PRODUCT),
      payload: {
        error,
      },
    });
    notification.error({ message: error });
  }
}
function* updateCartProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.patch(`http://localhost:5000/carts/${data.id}`, {
      quantity: data.quantity,
    });
    yield put({
      type: SUCCESS(CART_ACTION.UPDATE_CART_PRODUCT),
      payload: {
        data,
      },
    });
    if (callback?.showSuccess) callback.showSuccess();
  } catch (error) {
    yield put({
      type: FAIL(CART_ACTION.UPDATE_CART_PRODUCT),
      payload: { error },
    });
  }
}
export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_CART_LIST), getCartListSaga);
  yield takeEvery(REQUEST(CART_ACTION.ADD_TO_CART), addToCartSaga);
  yield takeEvery(
    REQUEST(CART_ACTION.REMOVE_CART_PRODUCT),
    removeCartProductSaga
  );
  yield takeEvery(
    REQUEST(CART_ACTION.UPDATE_CART_PRODUCT),
    updateCartProductSaga
  );
}
