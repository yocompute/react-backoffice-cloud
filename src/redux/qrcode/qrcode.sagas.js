import { put, call, select, takeLatest } from "redux-saga/effects";

import {
  FETCH_QRCODES,
  CREATE_QRCODE,
  UPDATE_QRCODE,
  fetchQrcodesSuccess,
  fetchQrcodesFail,
  createQrcodeSuccess,
  updateQrcodeSuccess,
} from "./qrcode.actions";

import QrcodeApi from "../../services/QrcodeApi";

export function* fetchQrcodes(action) {
  try {
    const qrcodes = yield call(QrcodeApi.get, action.query);
    yield put(fetchQrcodesSuccess(qrcodes));
  } catch (error) {
    yield put(fetchQrcodesFail(error));
  }
}

export function* createQrcode(action) {
  try {
    const qrcode = yield call(QrcodeApi.create, action.data);
    yield put(createQrcodeSuccess(qrcode));
    const qrcodes = yield call(QrcodeApi.get, null);
    yield put(fetchQrcodesSuccess(qrcodes));
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateQrcode(action) {
  try {
    const qrcode = yield call(QrcodeApi.update, action.data, action.id);
    yield put(updateQrcodeSuccess(qrcode));
    const qrcodes = yield call(QrcodeApi.get, null);
    yield put(fetchQrcodesSuccess(qrcodes));
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* watchQrcodes() {
  yield takeLatest(FETCH_QRCODES, fetchQrcodes);
  yield takeLatest(CREATE_QRCODE, createQrcode);
  yield takeLatest(UPDATE_QRCODE, updateQrcode);
}
