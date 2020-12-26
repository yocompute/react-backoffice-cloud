import {
    FETCH_AUTH_SUCCESS,
    LOGIN_SUCCESS, 
    SIGNUP_SUCCESS,
    LOGOUT_SUCCESS
} from './auth.actions';

export const authReducer = (state = null, action) => {
    if(action && action.type === FETCH_AUTH_SUCCESS){
        return action.tokenId;
    }
    if(action && action.type === LOGIN_SUCCESS){
        return action.tokenId;
    }
    if(action && action.type === SIGNUP_SUCCESS){
        return action.tokenId;
    }
    if(action && action.type === LOGOUT_SUCCESS){
        return null; // clean up tokenId
    }
    return state;
}

// export const authReducer = (state=null, action) => {
//     if(action && action.type === LOGOUT){
//         return { ...action.auth};
//     }
//     return state;
// }