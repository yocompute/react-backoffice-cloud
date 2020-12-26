import { put, call, select, takeLatest } from "redux-saga/effects";

import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  fetchProductsSuccess,
  fetchProductsFail,
  createProductSuccess,
  updateProductSuccess,
} from "./product.actions";

import ProductApi from "../../services/ProductApi";

export function* fetchProducts(action) {
  try {
    const products = yield call(ProductApi.get, action.query);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFail(error));
  }
}

export function* createProduct(action) {
  try {
    const product = yield call(ProductApi.create, action.data);
    yield put(createProductSuccess(product));
    const products = yield call(ProductApi.get, null);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateProduct(action) {
  try {
    const product = yield call(ProductApi.update, action.data, action.id);
    yield put(updateProductSuccess(product));
    const products = yield call(ProductApi.get, null);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* watchProducts() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
  yield takeLatest(CREATE_PRODUCT, createProduct);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
}
