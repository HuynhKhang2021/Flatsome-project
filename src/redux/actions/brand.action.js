import { createAction } from "@reduxjs/toolkit";
import { BRAND_ACTION, REQUEST } from "../constants";

export const getBrandListAction = createAction(
  REQUEST(BRAND_ACTION.GET_BRAND_lIST)
);
