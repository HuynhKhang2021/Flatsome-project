import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS , FAIL, CATEGORY_ACTION} from '../constants';

function* getCategoryListSaga (action) {
  try {
    const result = yield axios.get('http://localhost:5000/categories');
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_lIST),
      payload: {
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: FAIL(CATEGORY_ACTION.GET_CATEGORY_lIST), payload: {error: 'Fail to get category'}
    })
  }
}
export default function* categorySaga() {
  yield takeEvery(REQUEST(CATEGORY_ACTION.GET_CATEGORY_lIST), getCategoryListSaga)
}