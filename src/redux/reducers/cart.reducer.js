import { createReducer } from "@reduxjs/toolkit";

import { CART_ACTION, REQUEST, FAIL, SUCCESS,ORDER_ACTION } from "../constants";
const initialState = {
  cartList: {
    data: [],
    loading: false,
    error: null,
  },
  selectedCart: [],
  actionLoading: {
    addToCart: false,
    removeFromCart: false,
    updateCartProduct: false,
  },
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    return {
      ...state,
      cartList: {
        ...state.cartList,
        loading: true,
      },
    };
  },
  [SUCCESS(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        loading: false,
        error,
      },
    };
  },
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToCart: true,
      },
    };
  },
  [SUCCESS(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToCart: false,
      },
    };
  },
  [FAIL(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToCart: false,
      },
    };
  },
  [REQUEST(CART_ACTION.REMOVE_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        removeFromCart: true,
      },
    };
  },
  [SUCCESS(CART_ACTION.REMOVE_CART_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    const newCartList = state.cartList.data.filter(
      (cartItem) => cartItem.id !== data.id
    );
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
      actionLoading: {
        ...state.actionLoading,
        removeFromCart: false,
      },
    };
  },
  [FAIL(CART_ACTION.REMOVE_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        removeFromCart: false,
      },
    };
  },
  [REQUEST(CART_ACTION.UPDATE_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        updateCartProduct: true,
      },
    };
  },
  [SUCCESS(CART_ACTION.UPDATE_CART_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    const indexOfItem = state.cartList.data.findIndex(
      (cartItem) => cartItem.id === data.id
    );
    const newCartList = [...state.cartList.data];
    newCartList.splice(indexOfItem, 1, {
      ...state.cartList.data[indexOfItem],
      quantity: data.quantity,
    });
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
      actionLoading: {
        ...state.actionLoading,
        updateCartProduct: false,
      },
    };
  },
  [FAIL(CART_ACTION.UPDATE_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        updateCartProduct: false,
      },
    };
  },
  [REQUEST(CART_ACTION.SELECT_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      selectedCart: action.payload,
    };
  },
  [SUCCESS(ORDER_ACTION.ORDER_CART)]: (state, action) => {
    return {
      ...state,
      cartList:{
        ...state.cartList,
        data:[]
      },
      selectedCart:[]
    };
  },
});
export default cartReducer;
