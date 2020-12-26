import { put, call, select, takeLatest } from 'redux-saga/effects'
import MerchantApi from '../../services/MerchantApi'
import { fetchMerchantsFail, fetchMerchantsSuccess } from './merchant.actions';

export function* fetchMerchants(){
    try{
        const merchants = yield call(MerchantApi.get);
        yield put(fetchMerchantsSuccess(merchants));
    }catch(error){
        yield put(fetchMerchantsFail(error));
    }
}