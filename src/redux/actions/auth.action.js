import { createAction } from "@reduxjs/toolkit";
import { REQUEST, AUTH_ACTION } from "../constants";
export const registerAction = createAction(REQUEST(AUTH_ACTION.REGISTER))
export const loginAction = createAction(REQUEST(AUTH_ACTION.LOGIN))
export const logoutAction = createAction(AUTH_ACTION.LOGOUT)
export const getUserInfoAction = createAction(REQUEST(AUTH_ACTION.GET_USER_INFO))
export const changePasswordAction = createAction(REQUEST(AUTH_ACTION.CHANGE_PASSWORD))