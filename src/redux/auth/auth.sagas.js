import { put, call, select, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import AuthApi from '../../services/AuthApi';
import { FETCH_AUTH, LOGIN, SIGNUP, LOGOUT,
    fetchAuthSuccess, loginSuccess, signupSuccess, logoutSuccess } from './auth.actions';
import { setUser } from '../user/user.actions';
import { setLoading } from '../page/page.actions';

// import { selectACL } from '../ACL/ACL.selectors'
import {JWT_COOKIE, JWT_EXPIRY} from '../../const';

export function* fetchAuth() {
    try {
        const tokenId = Cookies.get(JWT_COOKIE);
        if(tokenId){
            const user = yield call(AuthApi.getUserByTokenId, tokenId);
            yield put(setUser(user && user._id ? user : null));
            yield put(fetchAuthSuccess(user? tokenId : null));
        }else{
            yield put(setUser(null));
            yield put(fetchAuthSuccess(null));
        }
        yield put(setLoading(false));
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* login(action) {
    try {
        const tokenId = yield call(AuthApi.login, action.data);
        Cookies.set(JWT_COOKIE, tokenId, { expires: JWT_EXPIRY });
        yield put(loginSuccess(tokenId));
        if(tokenId){
            const user = yield call(AuthApi.getUserByTokenId, tokenId);
            yield put(setUser(user && user._id ? user : null));
        }else{
            yield put(setUser(null));
        }
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* signup(action) {
    try {
        const tokenId = yield call(AuthApi.signup, action.data);
        yield put(signupSuccess(tokenId));
        if(tokenId){
            const user = yield call(AuthApi.getUserByTokenId, tokenId);
            yield put(setUser(user && user._id ? user : null));
        }else{
            yield put(setUser(null));
        }
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* logout(){
    Cookies.remove(JWT_COOKIE);
    yield put(logoutSuccess());
}

export function* watchAuth() {
    yield takeLatest(FETCH_AUTH, fetchAuth);
    yield takeLatest(LOGIN, login);
    yield takeLatest(SIGNUP, signup);
    yield takeLatest(LOGOUT, logout);
}