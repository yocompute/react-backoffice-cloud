import { put, call, select, takeLatest } from "redux-saga/effects";

import {
  FETCH_BRANDS,
  CREATE_BRAND,
  UPDATE_BRAND,
  fetchBrandsSuccess,
  fetchBrandsFail,
  createBrandSuccess,
  updateBrandSuccess,
} from "./brand.actions";

import BrandApi from "../../services/BrandApi";

export function* fetchBrands(action) {
  try {
    const brands = yield call(BrandApi.get, action.query);
    yield put(fetchBrandsSuccess(brands));
  } catch (error) {
    yield put(fetchBrandsFail(error));
  }
}

export function* createBrand(action) {
  try {
    const brand = yield call(BrandApi.create, action.data);
    yield put(createBrandSuccess(brand));
    const brands = yield call(BrandApi.get, null);
    yield put(fetchBrandsSuccess(brands));
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateBrand(action) {
  try {
    const brand = yield call(BrandApi.update, action.data, action.id);
    yield put(updateBrandSuccess(brand));
    const brands = yield call(BrandApi.get, null);
    yield put(fetchBrandsSuccess(brands));
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* watchBrands() {
  yield takeLatest(FETCH_BRANDS, fetchBrands);
  yield takeLatest(CREATE_BRAND, createBrand);
  yield takeLatest(UPDATE_BRAND, updateBrand);
}
