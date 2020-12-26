
import {
    FETCH_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    SET_PRODUCT
} from './product.actions';

export const productsReducer = (state=null, action) => {
    if(action && action.type === FETCH_PRODUCTS_SUCCESS){
        return [ ...action.products ];
    }
    return state;
}

export const productReducer = (state=null, action) => {
    if(action && action.type === SET_PRODUCT){
        return { ...action.product};
    }

    if(action && action.type === CREATE_PRODUCT_SUCCESS){
        return {...action.product };
    }

    if(action && action.type === UPDATE_PRODUCT_SUCCESS){
        return {...action.product };
    }

    return state;
}
