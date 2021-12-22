import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, COMMENT_ACTION } from "../constants";

function* getAllCommentSaga(action) {
  try {
    const result = yield axios.get("http://localhost:5000/comments", {
      params: {
        _expand: "user",
        _order: "desc",
        _sort: "createdAt",
      },
    });
    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_ALL_COMMENT),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.GET_ALL_COMMENT),
      payload: {
        error,
      },
    });
  }
}

function* getCommentListSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios.get("http://localhost:5000/comments", {
      params: {
        productId,
        _expand: "user",
        _order: "desc",
        _sort: "createdAt",
      },
    });
    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        error,
      },
    });
  }
}

function* postCommentSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios.post(
      "http://localhost:5000/comments",
      action.payload
    );
    yield put({
      type: REQUEST(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {productId}
    });
    yield put({
      type: SUCCESS(COMMENT_ACTION.POST_COMMENT),
      payload: result.data
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.POST_COMMENT),
      payload: {
        error,
      },
    });
  }
}

export default function* commentSaga() {
  yield takeEvery(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST), getCommentListSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.GET_ALL_COMMENT), getAllCommentSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.POST_COMMENT), postCommentSaga);
}
