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
export const getFavsItemsAction = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/favs`);
      dispatch(getFavsItems(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToFavoritesAction = (productId, userId) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId,
        productId,
      };

      const response = await axios.post(`${API_BASE_URL}/users/favs`, requestData);

      if (response.status === 200) {
        toast.success("¡Añadido a favoritos!");
        dispatch(addToFavorites(response.data));
      } else {
        toast.error("Ocurrió un error al agregar el producto a favoritos o ya existe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al agregar el producto a favoritos o ya existe");
    }
  };
};

export const deleteFavsItemAction = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/favs/${userId}/${itemId}`,
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

// Cart Actions
export const getCartItemsAction = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/cart`);
      dispatch(getCartItems(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCartAction = (cartItem, userId) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId,
        product: cartItem.product,
        sku: cartItem.sku,
        name: cartItem.name,
        image: cartItem.image,
        stock: cartItem.stock,
        price: cartItem.price,
        quantity: cartItem.quantity || 1,
        attributes: {
          color: cartItem.attributes?.color || "",
          model: cartItem.attributes?.model || "",
          storage: cartItem.attributes?.storage || "",
        },
      };

      const response = await axios.post(`${API_BASE_URL}/users/cart`, requestData);

      if (response.status === 200) {
        toast.success("¡Añadido al carrito!");
        dispatch(addToCart(response.data));
      } else {
        toast.error("Ocurrió un error al agregar el producto al carrito o ya existe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al agregar el producto al carrito o ya existe");
    }
  };
};

export const deleteCartItemAction = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/cart/${userId}/${itemId}`,
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
