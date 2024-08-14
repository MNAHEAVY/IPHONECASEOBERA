import axios from "axios";
import {
  getAllProducts,
  getProductById,
  putProd,
  deleteItem,
  createProd,
} from "../reducers/productsSlice";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";
// const API_BASE_URL = "http://localhost:3001";

// Products Actions
// Get
export const getAllProductsAction = () => {
  return async function (dispatch) {
    const products = await axios(`${API_BASE_URL}/products`);
    console.log(products);
    return dispatch(getAllProducts(products.data));
  };
};

// Get by id
export const getProductByIdAction = (productId) => {
  return async function (dispatch) {
    const prodId = await axios.get(`${API_BASE_URL}/product/${productId}`);
    console.log("aca", prodId);
    dispatch(getProductById(prodId.data));
  };
};

//Dashboard
export const createProdAction = (inputForm) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/products`, inputForm);
      dispatch(createProd(res.data));
      alert("Producto Creado.");
    } catch (err) {
      console.log(err);
      alert("Fallo la creación");
    }
  };
};

export const putProdAction = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/product/${id}`, input);
      dispatch(putProd(res.data));
      alert("El producto se actualizó correctamente.");
    } catch (err) {
      console.log(err);
      alert("El producto NO se actualizó correctamente.");
    }
  };
};

export const deleteItemAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/product/${id}`);
      dispatch(deleteItem(res.data));
      alert("El producto ha sido borrado");
    } catch (err) {
      console.log(err);
      alert("El producto no se borró");
    }
  };
};
