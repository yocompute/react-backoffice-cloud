import { put, call, select, takeLatest } from 'redux-saga/effects'
import UserApi from '../../services/UserApi'
import { FETCH_USERS, CREATE_USER, UPDATE_USER, 
    fetchUsersSuccess, createUserSuccess, updateUserSuccess } from './user.actions'
import { setACL } from '../ACL/ACL.actions'
import { selectACL } from '../ACL/ACL.selectors'

export function* fetchUsers(action) {
    try {
        const users = yield call(UserApi.get, action.query);
        yield put(fetchUsersSuccess(users));
        const { userId, role, permissions } = yield select(selectACL);
        const user = users[0];

        if (role === user.role) {
            yield put(setACL(userId, role, permissions));
        } else {
            yield put(setACL(user.id, user.role, user.permissions));
        }

    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* createUser(action) {
    try {
        const user = yield call(UserApi.create, action.data);
        yield put(createUserSuccess(user));
        const users = yield call(UserApi.get, null);
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* updateUser(action) {
    try {
        const user = yield call(UserApi.update, action.data, action.id);
        yield put(updateUserSuccess(user));
        const users = yield call(UserApi.get, null);
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* watchUser() {
    yield takeLatest(FETCH_USERS, fetchUsers);
    yield takeLatest(CREATE_USER, createUser);
    yield takeLatest(UPDATE_USER, updateUser);
}