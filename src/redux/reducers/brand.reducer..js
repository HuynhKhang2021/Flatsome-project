import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, BRAND_ACTION } from "../constants";
const initialState = {
  brandList: {
    data: [],
    loading: false,
    error: null
  }
}
const brandReducer = createReducer(initialState, {
  [REQUEST(BRAND_ACTION.GET_BRAND_lIST)] : (state, action) => {
    return {
      ...state,
      brandList: {
        ...state.brandList,
        loading: true,
        error: null
      }
    }
  },
  [SUCCESS(BRAND_ACTION.GET_BRAND_lIST)] : (state, action) => {
    const {data} = action.payload
    return {
      ...state,
      brandList: {
        ...state.brandList,
        data,
        loading: false,
        error: null
      }
    }
  },
  [FAIL(BRAND_ACTION.GET_BRAND_lIST)] : (state, action) => {
    const {error} = action.payload
    return {
      ...state,
      brandList: {
        ...state.brandList,
        loading: false,
        error
      }
    }
  }
})
export default brandReducer