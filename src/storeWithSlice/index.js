import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartReducers from "./cart-slice";
import searchReducers from './search-slice'
const reducer = combineReducers({
    cart: cartReducers,
    search: searchReducers
})
const store = configureStore({
    reducer
})
export default store