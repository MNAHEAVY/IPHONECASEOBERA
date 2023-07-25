import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addToFavorites,
  addToCart,
  deleteCartItem,
  getAllProducts,
  getValues,
  checkUserExists,
  checkUserAdmin,
  getProductById,
  filteredProducts,
  getAllUsers,
  getUser,
  putProd,
  putVal,
  deleteItem,
  createProd,
} from "../redux/reducer";

const API_BASE_URL = "http://localhost:3001";

export const addToFavoritesAction = (productId, userId) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId: userId,
        productId: productId,
      };

      const response = await axios.post(
        `${API_BASE_URL}/users/favs`,
        requestData
      );

      if (response.status === 200) {
        toast.success("¡Añadido a favoritos!");
      }

      dispatch(addToFavorites(response.data));
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocurrió un error al agregar el producto a favoritos o ya existe"
      );
    }
  };
};

export const addToCartAction = (defaultValues, userId) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId: userId,
        ...defaultValues,
      };
      const response = await axios.post(
        `${API_BASE_URL}/users/cart`,
        requestData
      );

      if (response.status === 200) {
        toast.success("¡Añadido al carrito!");
      }

      dispatch(addToCart(response.data));
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocurrió un error al agregar el producto al carrito o ya existe"
      );
    }
  };
};

export const deleteCartItemAction = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/cart/${userId}/${itemId}`
      );
      if (response.status === 200) {
        toast.success("¡Producto eliminado del carrito!");
      }
      dispatch(deleteCartItem(response.data));
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el producto del carrito");
      dispatch(deleteCartItemFailure(error.message));
    }
  };
};

export const getAllProductsAction = () => {
  return async function (dispatch) {
    const products = await axios(`${API_BASE_URL}/products`);

    return dispatch(getAllProducts(products.data));
  };
};

export const getValuesAction = () => {
  return async function (dispatch) {
    const values = await axios(`${API_BASE_URL}/values`);
    console.log(values);

    dispatch(getValues(values.data));
  };
};

export const checkUserExistsAction = (userData) => {
  return async function (dispatch) {
    await axios.post(`${API_BASE_URL}/users`, userData);
  };
};

export const checkUserAdminAction = (mail) => {
  return async function (dispatch) {
    const getUser = await axios.get(`${API_BASE_URL}/users?email=${mail}`);
    console.log(getUser);
    dispatch(checkUserAdmin(getUser.data));
  };
};

export const getProductByIdAction = (productId) => {
  return async function (dispatch) {
    const prodId = await axios.get(`${API_BASE_URL}/product/${productId}`);
    console.log("aca", prodId);
    dispatch(getProductById(prodId.data));
  };
};

export const filteredProductsAction = (payload) => {
  return async function (dispatch) {
    const filter = await axios.get(`${API_BASE_URL}/filter?${payload}`);
    dispatch(filteredProducts(filter.data));
  };
};

export const getAllUsersAction = () => {
  return async function (dispatch) {
    const users = await axios(`${API_BASE_URL}/allusers`);

    return dispatch(getAllUsers(users.data));
  };
};

export const getUserAction = (email) => {
  return async function (dispatch) {
    const user = await axios.get(`${API_BASE_URL}/users?email=${email}`);
    console.log(user);
    dispatch(getUser(user.data));
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

export const putValAction = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/values/${id}`, input);
      dispatch(putVal(res.data));
      alert("Los valores se actualizaron correctamente.");
    } catch (err) {
      console.log(err);
      alert("Los valores NO se actualizaron correctamente.");
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
