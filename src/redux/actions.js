import axios from "axios";
export const FILTERED_PRODUCTS = "FILTERED_PRODUCTS";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const CHECK_USER = "CHECK_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_VALUES = "GET_VALUES";
export const CHECK_USER_EXISTS = "GET_VALUES";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const PUT_VALUES = "PUT_VALUES";
export const CREATE = "CREATE";

export const getAllProducts = () => {
  return async function (dispatch) {
    const products = await axios("http://localhost:3001/products");

    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: products.data,
    });
  };
};
export const getValues = () => {
  return async function (dispatch) {
    const values = await axios(`http://localhost:3001/values`);
    console.log(values);

    dispatch({
      type: GET_VALUES,
      payload: values.data,
    });
  };
};
export const checkUserExists = (userData) => {
  return async function (dispatch) {
    await axios.post("http://localhost:3001/users", userData);
  };
};

export const checkUserAdmin = (mail) => {
  return async function (dispatch) {
    const getUser = await axios.get(
      `http://localhost:3001/users?email=${mail}`
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
      `http://localhost:3001/product/${productId}`
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
    const filter = await axios.get(`http://localhost:3001/filter?${payload}`);
    dispatch({
      type: FILTERED_PRODUCTS,
      payload: filter.data,
    });
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    const users = await axios("http://localhost:3001/allusers");

    return dispatch({
      type: GET_ALL_USERS,
      payload: users.data,
    });
  };
};
export const putProd = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3001/product/${id}`, input);
      dispatch({
        type: "PUT_PRODUCT",
        payload: res.data,
      });
      alert("El producto se actualizó correctamente.");
    } catch (err) {
      console.log(err);
      alert("El producto NO se actualizó correctamente.");
    }
  };
};

export const putVal = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3001/values/${id}`, input);
      dispatch({
        type: "PUT_VALUES",
        payload: res.data,
      });
      alert("Los valores se actualizaron correctamente.");
    } catch (err) {
      console.log(err);
      alert("Los valores NO se actualizaron correctamente.");
    }
  };
};

export const createProd = (inputForm) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:3001/products", inputForm);
      dispatch({
        type: "CREATE",
        payload: res.data,
      });
      alert("Producto Creado.");
    } catch (err) {
      console.log(err);
      alert("Fallo la creacion");
    }
  };
};
