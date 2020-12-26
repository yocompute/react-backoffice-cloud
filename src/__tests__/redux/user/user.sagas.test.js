

import { call } from 'redux-saga/effects'

import UserApi from '../../../services/UserApi'
import {fetchUsers} from '../../../redux/user/user.sagas'

it("getUsers", () => {
    const it = fetchUsers('test')
    expect(it.next().value).toEqual(call(UserApi.get, 'test'));
})