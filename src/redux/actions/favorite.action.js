import {createAction} from '@reduxjs/toolkit';
import { FAVORITE_ACTION, REQUEST } from '../constants';

export const getFavoriteListAction = createAction(REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST))
export const likeProductAction = createAction(REQUEST(FAVORITE_ACTION.LIKE_PRODUCT))
export const dislikeProductAction = createAction(REQUEST(FAVORITE_ACTION.DISLIKE_PRODUCT))