import { createAction } from "@reduxjs/toolkit";
import { REQUEST,COMMENT_ACTION } from "../constants";
export const getCommentListAction = createAction(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST))
export const getAllCommentAction = createAction(REQUEST(COMMENT_ACTION.GET_ALL_COMMENT))
export const postCommentAction = createAction(REQUEST(COMMENT_ACTION.POST_COMMENT))