import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import { AUTH_ACTION, REQUEST, FAIL, SUCCESS } from "../constants";
function* registerSaga(action) {
  const { data, callback } = action.payload;
  try {
    yield axios.post("http://localhost:5000/register", data);
    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
    });
    yield callback.backToLogin();
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error: e.response.data,
      },
    });
  }
}
function* loginSaga(action) {
  const { data, callback } = action.payload;
  try {
    const result = yield axios.post("http://localhost:5000/login", data);
    console.log(
      "🚀 ~ file: auth.saga.js ~ line 25 ~ function*loginSaga ~ result",
      result
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    yield localStorage.setItem(
      "userInfo",
      JSON.stringify({
        accessToken: result.data.accessToken,
        role: result.data.user.role,
      })
    );
    yield callback.goBackHome();
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: e.response.data,
      },
    });
  }
}
function* getUserInfoSaga(action) {
  const { id } = action.payload;
  const result = yield axios.get(`http://localhost:5000/users/${id}`);
  yield put({
    type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
    payload: {
      data: result.data,
    },
  });
}
function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post("http://localhost:5000/login", {
      email: data.email,
      password: data.oldPassword,
    });
    yield axios.patch(`http://localhost:5000/users/${id}`, {
      password: data.newPassword,
    });
    yield notification.success({
      message: "Changing password is success",
    });
    yield callback.clearForm();
    yield put({
      type: SUCCESS(AUTH_ACTION.CHANGE_PASSWORD),
    });
  } catch (error) {
    yield notification.error({
      message: "Password is incorrect",
    });
    yield put({
      type: FAIL(AUTH_ACTION.CHANGE_PASSWORD),
      payload: {
        error,
      },
    });
  }
}
export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.CHANGE_PASSWORD), changePasswordSaga);
}
