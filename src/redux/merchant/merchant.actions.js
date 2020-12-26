// action types
export const FETCH_MERCHANTS = 'merchant/FETCH_MERCHANTS';
export const FETCH_MERCHANTS_SUCCESS = 'merchant/FETCH_MERCHANTS_SUCCESS';
export const FETCH_MERCHANTS_FAIL = 'merchant/FETCH_MERCHANTS_FAIL';

export const SET_MERCHANT = 'merchant/SET_MERCHANT';


// action creators
export const fetchMerchants = (payload) => ({
    type: FETCH_MERCHANTS
})

export const fetchMerchantsSuccess = (merchants = []) => ({
    type: FETCH_MERCHANTS_SUCCESS,
    merchants
})

export const fetchMerchantsFail = (error) => ({
    type: FETCH_MERCHANTS_FAIL,
    error
})

export const setMerchant = merchant => ({
    type: SET_MERCHANT,
    merchant
})