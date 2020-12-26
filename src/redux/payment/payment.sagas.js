import { put, call, select, takeLatest } from 'redux-saga/effects'

import { FETCH_PAYMENTS, CREATE_PAYMENT, UPDATE_PAYMENT, 
    fetchPaymentsSuccess, fetchPaymentsFail, createPaymentSuccess, updatePaymentSuccess } from './payment.actions'

import PaymentApi from '../../services/PaymentApi';

export function* fetchPayments(action){
    try{
        const payments = yield call(PaymentApi.get, action.query);
        yield put(fetchPaymentsSuccess(payments));
    }catch(error){
        yield put(fetchPaymentsFail(error));
    }
}

export function* createPayment(action) {
    try {
        const payment = yield call(PaymentApi.create, action.data);
        yield put(createPaymentSuccess(payment));
        const payments = yield call(PaymentApi.get, null);
        yield put(fetchPaymentsSuccess(payments));
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* updatePayment(action) {
    try {
        const payments = yield call(PaymentApi.update, action.data);
        yield put(updatePaymentSuccess(payments));

    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* watchPayments(){
    yield takeLatest(FETCH_PAYMENTS, fetchPayments);
    yield takeLatest(CREATE_PAYMENT, createPayment);
    yield takeLatest(UPDATE_PAYMENT, updatePayment);
}