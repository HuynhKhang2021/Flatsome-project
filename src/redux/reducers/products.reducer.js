import {createReducer} from '@reduxjs/toolkit'
import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL,FAVORITE_ACTION } from '../constants'
const initialState = {
  productList: {
    data: [],
    loading: false,
    error: null,
    meta: {}
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
}
const productsReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)] : (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true
      }
    }
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)] : (state, action) => {
    const {data, meta, more} = action.payload
    if(more) {
      return {
        ...state,
        productList: {
          ...state.productList,
          data: [...state.productList.data,...data],
          loading: false,
          error: null,
          meta: meta
        }
      }
    }
    return {
      ...state,
      productList: {
        ...state.productList,
        data,
        loading: false,
        error: null,
        meta: meta
      }
    }
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)] : (state, action) => {
    const {error} = action.payload
    return {
      ...state,
      productList: {
        ...state.productList,
        error,
        loading: false
      }
    }
  },
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)] : (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: true
      }
    }
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const {data} = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data,
        loading: false,
        error: null
      }
    }
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const {error} = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        error
      }
    }
  },
  [SUCCESS(FAVORITE_ACTION.LIKE_PRODUCT)]: (state, action) => {
    const {data} = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data:{
          ...state.productDetail.data,
          favorites:[
            ...state.productDetail.data.favorites,
            data
          ]
        }
      }
    }
  },[SUCCESS(FAVORITE_ACTION.DISLIKE_PRODUCT)]: (state, action) => {
    const {data} = action.payload;
    const newListFavoriteUser = state.productDetail.data.favorites.filter(item => item.id !== data.id)
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data:{
          ...state.productDetail.data,
          favorites:newListFavoriteUser
        }
      }
    }
  },
})

export default productsReducer;