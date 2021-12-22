import { put, takeEvery } from "redux-saga/effects";
import { FAVORITE_ACTION, REQUEST, SUCCESS, FAIL} from "../constants";
import axios from "axios";
function* getFavoriteListSaga(action) {
  try {
    const result = yield axios.get(
      "http://localhost:5000/favorites"
    );
    yield put({
      type: SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST),
      payload: {
        error,
      },
    });
  }
}
function* likeProductSaga(action) {
  try {
    const result = yield axios.post(
      "http://localhost:5000/favorites",
      action.payload
    );
    yield put({
      type: SUCCESS(FAVORITE_ACTION.LIKE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FAVORITE_ACTION.LIKE_PRODUCT),
      payload: {
        error,
      },
    });
  }
}
function* dislikeProductSaga(action) {
  const { id } = action.payload;
  try {
    yield axios.delete(`http://localhost:5000/favorites/${id}`);
    yield put({
      type: SUCCESS(FAVORITE_ACTION.DISLIKE_PRODUCT),
      payload: {
        data: {
          id,
        },
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FAVORITE_ACTION.DISLIKE_PRODUCT),
      payload: {
        error,
      },
    });
  }
}
export default function* favoriteSaga() {
  yield takeEvery(REQUEST(FAVORITE_ACTION.LIKE_PRODUCT),likeProductSaga)
  yield takeEvery(REQUEST(FAVORITE_ACTION.DISLIKE_PRODUCT),dislikeProductSaga)
  yield takeEvery(REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST),getFavoriteListSaga)
}
