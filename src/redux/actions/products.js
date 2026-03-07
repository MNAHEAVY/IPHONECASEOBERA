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

function normalizeProduct(product) {
  const variants = product?.variants || [];

  const prices = variants.map((v) => Number(v?.price) || 0).filter((p) => p > 0);

  const minVariantPrice = prices.length ? Math.min(...prices) : 0;

  const imageFromVariant = variants.find((v) => v?.images?.length)?.images?.[0] || "";

  return {
    ...product,
    displayName: product?.name || "",
    displayImage: product?.images?.[0] || imageFromVariant || "",
    displayPrice: minVariantPrice,
  };
}

// Get all
export const getAllProductsAction = () => {
  return async function (dispatch) {
    const response = await axios(`${API_BASE_URL}/products`);
    const normalizedProducts = response.data.map(normalizeProduct);
    return dispatch(getAllProducts(normalizedProducts));
  };
};

// Get by id
export const getProductByIdAction = (productId) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
    const normalizedProduct = normalizeProduct(response.data);
    dispatch(getProductById(normalizedProduct));
  };
};

// Dashboard
export const createProdAction = (inputForm) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/products`, inputForm);
      dispatch(createProd(normalizeProduct(res.data)));
      alert("Producto creado.");
    } catch (err) {
      console.log(err);
      alert("Falló la creación");
    }
  };
};

export const putProdAction = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/product/${id}`, input);
      dispatch(putProd(normalizeProduct(res.data)));
      alert("El producto se actualizó correctamente.");
    } catch (err) {
      console.log(err);
      alert("El producto no se actualizó correctamente.");
    }
  };
};

export const deleteItemAction = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_BASE_URL}/product/${id}`);
      dispatch(deleteItem(id));
      alert("El producto ha sido borrado");
    } catch (err) {
      console.log(err);
      alert("El producto no se borró");
    }
  };
};
