import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS , FAIL, BRAND_ACTION} from '../constants';

function* getBrandListSaga (action) {
  try {
    const result = yield axios.get('http://localhost:5000/brands');
    yield put({
      type: SUCCESS(BRAND_ACTION.GET_BRAND_lIST),
      payload: {
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: FAIL(BRAND_ACTION.GET_BRAND_lIST), payload: {error: 'Fail to get brand'}
    })
  }
}
export default function* brandSaga() {
  yield takeEvery(REQUEST(BRAND_ACTION.GET_BRAND_lIST), getBrandListSaga)
}