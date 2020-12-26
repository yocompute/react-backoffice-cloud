
import { call } from 'redux-saga/effects'

import ProductApi from '../../../services/ProductApi'
import {fetchProducts} from '../../../redux/product/product.sagas'

it("getProducts", () => {
    const it = fetchProducts('test')
    expect(it.next().value).toEqual(call(ProductApi.get, 'test'));
})