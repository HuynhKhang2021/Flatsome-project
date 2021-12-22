import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    productsSearch: [],
    searchKey: '',
  },
  reducers: {
    searchedItem(state, action) {
      state.productsSearch = action.payload.items;
      state.searchKey = action.payload.key
    },
  },
});
export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
