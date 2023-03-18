import axios from "axios";
export const FILTERED_PRODUCTS = "FILTERED_PRODUCTS";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";

export const getAllProducts = () => {
  return async function (dispatch) {
    const products = await axios("http://localhost:3001/products");

    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: products.data,
    });
  };
};

export const filteredProducts = (payload) => {
  return async function (dispatch) {
    const filter = await axios.get(`http://localhost:3001/filter?${payload}`);
    dispatch({
      type: FILTERED_PRODUCTS,
      payload: filter.data,
    });
  };
};

export const getProductById = (productId) => {
  return async function (dispatch) {
    const prodId = await axios.get(
      `http://localhost:3001/product/${productId}`
    );
    console.log(prodId);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: prodId.data,
    });
  };
};
