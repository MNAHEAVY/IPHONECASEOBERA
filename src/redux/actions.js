import axios from "axios";
export const FILTERED_PRODUCTS = "FILTERED_PRODUCTS";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const CHECK_USER = "CHECK_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_VALUES = "GET_VALUES";
export const CHECK_USER_EXISTS = "GET_VALUES";

export const getAllProducts = () => {
  return async function (dispatch) {
    const products = await axios(
      "https://iphonecaseoberab-production.up.railway.app/products"
    );

    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: products.data,
    });
  };
};
export const getValues = () => {
  return async function (dispatch) {
    const values = await axios(
      `https://iphonecaseoberab-production.up.railway.app/values`
    );
    console.log(values);

    dispatch({
      type: GET_VALUES,
      payload: values.data,
    });
  };
};
export const checkUserExists = (userData) => {
  return async function (dispatch) {
    try {
      const postRes = await axios.post(
        "https://iphonecaseoberab-production.up.railway.app/users",
        userData
      );
      console.log(postRes);
    } catch (error) {}

    dispatch({
      type: CHECK_USER_EXISTS,
      payload: postRes.data,
    });
  };
};

export const checkUserAdmin = (mail) => {
  return async function (dispatch) {
    const getUser = await axios.get(
      `https://iphonecaseoberab-production.up.railway.app/users?email=${mail}`
    );
    console.log(getUser);
    dispatch({
      type: CHECK_USER,
      payload: getUser.data,
    });
  };
};

export const getProductById = (productId) => {
  return async function (dispatch) {
    const prodId = await axios.get(
      `https://iphonecaseoberab-production.up.railway.app/product/${productId}`
    );
    console.log(prodId);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: prodId.data,
    });
  };
};

export const filteredProducts = (payload) => {
  return async function (dispatch) {
    const filter = await axios.get(
      `https://iphonecaseoberab-production.up.railway.app/filter?${payload}`
    );
    dispatch({
      type: FILTERED_PRODUCTS,
      payload: filter.data,
    });
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    const users = await axios(
      "https://iphonecaseoberab-production.up.railway.app/allusers"
    );

    return dispatch({
      type: GET_ALL_USERS,
      payload: users.data,
    });
  };
};
