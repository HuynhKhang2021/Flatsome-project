import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getProductListSaga(action) {
  // Gọi danh sách sản phẩm lấy từ server
  const {
    limit,
    more,
    page,
    keyword,
    categoryFilter,
    priceFilter,
    isFeatured,
    brandFilter,
    sortFilter,
  } = action.payload;
  let categoryParam = "";
  if (categoryFilter) {
    categoryFilter.forEach((filterItem, filterIndex) => {
      const paramAnd = filterIndex === 0 ? "" : "&";
      categoryParam = categoryParam + `${paramAnd}categoryId=${filterItem.id}`;
    });
  }

  let brandParam = "";
  if (brandFilter) {
    brandFilter.forEach(
      (brandFilterItem) =>
        (brandParam = brandParam + `&brandId=${brandFilterItem.id}`)
    );
  }

  try {
    const result = yield axios.get(
      `http://localhost:5000/products?${categoryParam}${brandParam}`,
      {
        params: {
          ...(isFeatured && { isFeatured: true }),
          _limit: limit,
          _expand: ["category", "brand"],
          _embed: "options",
          ...(page && { _page: page }),
          ...(keyword && { q: keyword }),
          ...(priceFilter && {
            price_gte: priceFilter[0],
            price_lte: priceFilter[1],
          }),
          ...(sortFilter && {
            _sort: "price",
            _order: sortFilter,
          }),

          // q là công cụ tìm kiếm của phía json server
        },
      }
    );

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          total: parseInt(result.headers["x-total-count"]),
        },
        more,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: { error },
    });
  }
}
function* getProductDetailSaga(action) {
  const { id } = action.payload;
  try {
    const result = yield axios.get(`http://localhost:5000/products/${id}`, {
      params: {
        _expand: ["category", "brand"],
        _embed: ["options","favorites"],
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {}
}
export default function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
}
