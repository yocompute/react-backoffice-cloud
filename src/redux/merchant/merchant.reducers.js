
import {FETCH_MERCHANTS_SUCCESS, SET_MERCHANT} from '../merchant/merchant.actions';

export const merchantsReducer = (state=null, action) => {
    if(action && action.type === FETCH_MERCHANTS_SUCCESS){
        return [ ...action.merchants ];
    }
    return state;
}

export const merchantReducer = (state=null, action) => {
    if(action && action.type === SET_MERCHANT){
        return { ...action.merchant};
    }
    return state;
}