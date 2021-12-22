import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS , FAIL, ADDRESS_ACTION} from '../constants';

function* getCityAddressListSaga (action) {
  try {
    const result = yield axios.get('http://localhost:5001/cities');
    yield put({
      type: SUCCESS(ADDRESS_ACTION.GET_CITY_ADDRESS_LIST),
      payload: {
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: FAIL(ADDRESS_ACTION.GET_CITY_ADDRESS_LIST), payload: {error: 'Fail to get state'}
    })
  }
}
function* getDistrictAddressListSaga (action) {
  try {
    const {code} = action.payload
    const result = yield axios.get('http://localhost:5001/districts',{
      params: {
        parentcode:code
      }
    });
    yield put({
      type: SUCCESS(ADDRESS_ACTION.GET_DISTRICT_ADDRESS_LIST),
      payload: {
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: FAIL(ADDRESS_ACTION.GET_DISTRICT_ADDRESS_LIST), payload: {error: 'Fail to get district'}
    })
  }
}
function* getWardAddressListSaga (action) {
  try {
    const {code} = action.payload
    const result = yield axios.get('http://localhost:5001/wards',{
      params: {
        parentcode:code
      }
    });
    yield put({
      type: SUCCESS(ADDRESS_ACTION.GET_WARD_ADDRESS_LIST),
      payload: {
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: FAIL(ADDRESS_ACTION.GET_WARD_ADDRESS_LIST), payload: {error: 'Fail to get district'}
    })
  }
}
export default function* addressSaga() {
  yield takeEvery(REQUEST(ADDRESS_ACTION.GET_CITY_ADDRESS_LIST), getCityAddressListSaga)
  yield takeEvery(REQUEST(ADDRESS_ACTION.GET_DISTRICT_ADDRESS_LIST), getDistrictAddressListSaga)
  yield takeEvery(REQUEST(ADDRESS_ACTION.GET_WARD_ADDRESS_LIST), getWardAddressListSaga)
}