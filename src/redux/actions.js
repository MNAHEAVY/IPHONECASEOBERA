import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addToFavorites,
  addToCart,
  deleteCartItem,
  deleteFavsItem,
  getFavsItems,
  getAllProducts,
  getValues,
  getCartItems,
  checkUserExists,
  checkUserAdmin,
  getProductById,
  filteredProducts,
  getAllUsers,
  getUser,
  updateUser,
  putProd,
  putVal,
  deleteItem,
  createProd,
  setSearchedProduct,
} from "../redux/reducer";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";
// const API_BASE_URL = "http://localhost:3001";

// Favorites Actions
// Get
export const getFavsItemsAction = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/favs`);
      const favsItems = response.data;

      dispatch(getFavsItems(favsItems));
    } catch (error) {
      // dispatch(getFavsItems("Error al obtener los elementos del carrito."));
    }
  };
};
// Add
export const addToFavoritesAction = (productId, userId) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId: userId,
        productId: productId,
      };

      const response = await axios.post(`${API_BASE_URL}/users/favs`, requestData);

      if (response.status === 200) {
        const addedFavsItem = response.data;
        toast.success("¡Añadido a favoritos!");
        dispatch(addToFavorites(addedFavsItem));
      } else {
        toast.error("Ocurrió un error al agregar el producto a favoritos o ya existe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al agregar el producto a favoritos o ya existe");
    }
  };
};

// Delete
export const deleteFavsItemAction = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/favs/${userId}/${itemId}`
      );
      if (response.status === 200) {
        toast.success("¡Producto eliminado de favoritos!");
      }
      dispatch(deleteFavsItem(itemId));
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el producto, reintente");
    }
  };
};

//Cart Actions
// Get
export const getCartItemsAction = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/cart`);
      const cartItems = response.data;

      dispatch(getCartItems(cartItems));
    } catch (error) {
      // dispatch(getCartItems("Error al obtener los elementos del carrito."));
    }
  };
};
// Add
export const addToCartAction = (defaultValues, userId) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId: userId,
        ...defaultValues,
      };
      const response = await axios.post(`${API_BASE_URL}/users/cart`, requestData);

      if (response.status === 200) {
        const addedCartItem = response.data; // Assuming the created cart item is returned in the response
        toast.success("¡Añadido al carrito!");
        dispatch(addToCart(addedCartItem)); // Dispatch the action with the created cart item
      } else {
        toast.error("Ocurrió un error al agregar el producto al carrito o ya existe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al agregar el producto al carrito o ya existe");
    }
  };
};
// Delete
export const deleteCartItemAction = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/cart/${userId}/${itemId}`
      );
      if (response.status === 200) {
        toast.success("¡Producto eliminado del carrito!");
      }
      dispatch(deleteCartItem(itemId));
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el producto del carrito");
    }
  };
};
// Products Actions
// Get
export const getAllProductsAction = () => {
  return async function (dispatch) {
    const products = await axios(`${API_BASE_URL}/products`);
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
export const filteredProductsAction = (payload) => {
  return async function (dispatch) {
    const filter = await axios.get(`${API_BASE_URL}/filter?${payload}`);
    dispatch(filteredProducts(filter.data));
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

export const searchedProduct = (searchTerm) => {
  return async (dispatch) => {
    const allProduct = await axios(`${API_BASE_URL}/products`);

    const filteredProduct = allProduct.data.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setSearchedProduct(filteredProduct));
  };
};

// Values Actions

export const getValuesAction = () => {
  return async function (dispatch) {
    const values = await axios(`${API_BASE_URL}/values`);
    console.log(values);

    dispatch(getValues(values.data));
  };
};

//User Actions

export const checkUserExistsAction = (userData) => {
  return async function () {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      // Handle the response here if needed
      console.log("Response:", response.data);
    } catch (error) {
      // Handle the error here
      console.error("Error:", error.message);
    }
  };
};

export const checkUserAdminAction = (mail) => {
  return async function (dispatch) {
    const getUser = await axios.get(`${API_BASE_URL}/users?email=${mail}`);
    console.log(getUser);
    dispatch(checkUserAdmin(getUser.data));
  };
};

export const updateUserAction = (updatedUserData) => {
  return async function (dispatch) {
    const updatedUserResponse = await axios.put(
      `${API_BASE_URL}/useredit/${updatedUserData.id}`,
      updatedUserData
    );
    if (updatedUserResponse.status === 200) {
      const updatedUser = updatedUserResponse.data;

      dispatch(updateUser(updatedUser));

      toast.success("User updated successfully");
    } else {
      toast.error("Failed to update user");
    }
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

export const putValAction = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/values/${id}`, input);
      if (res.status === 200) {
        const newedVal = res.data;
        toast.success("¡Valores actualizados!");
        dispatch(putVal(newedVal));
      } else {
        toast.error("¡No se ha actualizado!");
      }
    } catch (error) {
      console.error(error);
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
