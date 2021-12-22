import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, ADDRESS_ACTION } from "../constants";
const initialState = {
  cityList: {
    data: [],
    loading: false,
    error: null
  },
  districtList: {
    data: [],
    loading: false,
    error: null
  },
  wardList: {
    data: [],
    loading: false,
    error: null
  },
}
const addressReducer = createReducer(initialState, {
  [REQUEST(ADDRESS_ACTION.GET_CITY_ADDRESS_LIST)] : (state, action) => {
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: true,
        error: null
      }
    }
  },
  [SUCCESS(ADDRESS_ACTION.GET_CITY_ADDRESS_LIST)] : (state, action) => {
    const {data} = action.payload
    return {
      ...state,
      cityList: {
        ...state.cityList,
        data,
        loading: false,
        error: null
      }
    }
  },
  [FAIL(ADDRESS_ACTION.GET_CITY_ADDRESS_LIST)] : (state, action) => {
    const {error} = action.payload
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: false,
        error
      }
    }
  },
  [REQUEST(ADDRESS_ACTION.GET_DISTRICT_ADDRESS_LIST)] : (state, action) => {
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: true,
        error: null
      }
    }
  },
  [SUCCESS(ADDRESS_ACTION.GET_DISTRICT_ADDRESS_LIST)] : (state, action) => {
    const {data} = action.payload
    return {
      ...state,
      districtList: {
        ...state.districtList,
        data,
        loading: false,
        error: null
      }
    }
  },
  [FAIL(ADDRESS_ACTION.GET_DISTRICT_ADDRESS_LIST)] : (state, action) => {
    const {error} = action.payload
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: false,
        error
      }
    }
  },
  [REQUEST(ADDRESS_ACTION.GET_WARD_ADDRESS_LIST)] : (state, action) => {
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: true,
        error: null
      }
    }
  },
  [SUCCESS(ADDRESS_ACTION.GET_WARD_ADDRESS_LIST)] : (state, action) => {
    const {data} = action.payload
    return {
      ...state,
      wardList: {
        ...state.wardList,
        data,
        loading: false,
        error: null
      }
    }
  },
  [FAIL(ADDRESS_ACTION.GET_WARD_ADDRESS_LIST)] : (state, action) => {
    const {error} = action.payload
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: false,
        error
      }
    }
  }
})
export default addressReducer