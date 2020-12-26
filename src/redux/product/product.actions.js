// action types
export const FETCH_PRODUCTS = "product/FETCH_PRODUCTS";
export const FETCH_PRODUCTS_SUCCESS = "product/FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAIL = "product/FETCH_PRODUCTS_FAIL";

export const CREATE_PRODUCT = "product/CREATE_PRODUCT";
export const CREATE_PRODUCT_SUCCESS = "product/CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAIL = "product/CREATE_PRODUCT_FAIL";

export const UPDATE_PRODUCT = "product/UPDATE_PRODUCT";
export const UPDATE_PRODUCT_SUCCESS = "product/UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAIL = "product/UPDATE_PRODUCT_FAIL";

export const SET_PRODUCT = "product/SET_PRODUCT";

// action creators
export const fetchProducts = (payload) => ({
  type: FETCH_PRODUCTS,
});

export const fetchProductsSuccess = (products = []) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products,
});

export const fetchProductsFail = (error) => ({
  type: FETCH_PRODUCTS_FAIL,
  error,
});

export const createProduct = (data) => ({
  type: CREATE_PRODUCT,
  data,
});

export const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  product,
});

export const createProductFail = (error) => ({
  type: CREATE_PRODUCT_FAIL,
  error,
});

export const updateProduct = (data, id) => ({
  type: UPDATE_PRODUCT,
  data,
  id,
});

export const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  product,
});

export const updateProductFail = (error) => ({
  type: UPDATE_PRODUCT_FAIL,
  error,
});

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});
