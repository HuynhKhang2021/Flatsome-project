import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, FAIL, SUCCESS, AUTH_ACTION } from "../constants";
const initialState = {
  userInfo: {
    data: null,
    loading: false,
  },
  responseAction: {
    register: {
      loading: false,
      error: "",
    },
    login: {
      loading: false,
      error: "",
    },
    changePassword: {
      loading: false,
      error: "",
    },
  },
};
const authReducer = createReducer(initialState, {
  [REQUEST(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          loading: true,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          loading: false,
          error: "",
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          loading: false,
          error,
        },
      },
    };
  },
  [REQUEST(AUTH_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          loading: true,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: { ...state.userInfo, data },
      responseAction: {
        ...state.responseAction,
        login: {
          loading: false,
          error: "",
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          loading: false,
          error,
        },
      },
    };
  },
  [REQUEST(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        loading: false,
      },
    };
  },
  [REQUEST(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        changePassword: {
          loading: true,
          error: '',
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        changePassword: {
          loading: false,
          error,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        changePassword: {
          loading: false,
          error: '',
        },
      },
    };
  },
  [AUTH_ACTION.LOGOUT]: (state, action) => {
    return {
      ...state,
      userInfo: {
        data: null,
        loading: false,
      },
    };
  },
});
export default authReducer;
