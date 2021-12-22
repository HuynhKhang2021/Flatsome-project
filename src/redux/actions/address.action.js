import { createAction } from "@reduxjs/toolkit";
import { ADDRESS_ACTION, REQUEST } from "../constants";
export const getCityAddressAction = createAction(
  REQUEST(ADDRESS_ACTION.GET_CITY_ADDRESS_LIST)
);
export const getDistrictAddressAction = createAction(
  REQUEST(ADDRESS_ACTION.GET_DISTRICT_ADDRESS_LIST)
);
export const getWardAddressAction = createAction(
  REQUEST(ADDRESS_ACTION.GET_WARD_ADDRESS_LIST)
);
