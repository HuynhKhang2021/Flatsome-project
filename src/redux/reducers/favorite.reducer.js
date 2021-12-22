import { createReducer } from "@reduxjs/toolkit";
import { FAVORITE_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  favoriteList: {
    data: [],
    loading: false,
    error: null,
  },
  responseAction: {
    like: {
      loading: false,
      error: null,
    },
    dislike: {
      loading: false,
      error: null,
    },
  },
};

const favoriteReducer = createReducer(initialState, {
  [REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: true,
        error: null
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        data,
        loading: false,
        error: null
      },
    };
  },
  [FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
          loading: false,
          error,
      },
    };
  },
  [REQUEST(FAVORITE_ACTION.LIKE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        like: {
          loading: true,
          error: null,
        },
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.LIKE_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        data: [...state.favoriteList, data],
      },
      responseAction: {
        ...state.responseAction,
        like: {
          loading: false,
          error: null,
        },
      },
    };
  },
  [FAIL(FAVORITE_ACTION.LIKE_PRODUCT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        like: {
          loading: false,
          error,
        },
      },
    };
  },
  [REQUEST(FAVORITE_ACTION.DISLIKE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        dislike: {
          loading: true,
          error: null,
        },
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.DISLIKE_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    const newFavoriteList = state.favoriteList.filter(
      (favoriteItem) => favoriteItem.id !== data.id
    );
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        data: newFavoriteList,
      },
      responseAction: {
        ...state.responseAction,
        dislike: {
          loading: false,
          error: null,
        },
      },
    };
  },
  [REQUEST(FAVORITE_ACTION.DISLIKE_PRODUCT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        dislike: {
          loading: false,
          error,
        },
      },
    };
  },
});

export default favoriteReducer;
