import { all } from 'redux-saga/effects';
import { watchAuth } from './auth/auth.sagas';
import { watchUser } from './user/user.sagas';
import { watchBrands } from './brand/brand.sagas';
import { watchCategories } from './category/category.sagas';
import { watchProducts } from './product/product.sagas';
import { watchPayments } from "./payment/payment.sagas";
import { watchQrcodes } from './qrcode/qrcode.sagas';

export default function* rootSaga() {
  // const [auth, users, products, brands, categories] = 
  yield all([
    watchAuth(),
    watchUser(),
    watchBrands(),
    watchCategories(),
    watchProducts(),
    watchPayments(),
    watchQrcodes()
  ]);
}
