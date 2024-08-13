import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  addToFavorites,
  addToCart,
  deleteCartItem,
  deleteFavsItem,
  getFavsItems,
  getCartItems,
} from "../reducers/cartSlice";

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
