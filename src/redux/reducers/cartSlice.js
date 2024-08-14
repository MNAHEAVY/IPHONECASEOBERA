import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  favorites: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    getFavsItems(state, action) {
      state.favorites = action.payload;
    },

    // Mantén los elementos existentes en el carrito y agrega uno nuevo
    addToFavorites(state, action) {
      const newFav = action.payload;
      state.favorites = [...state.favorites, newFav];
    },

    // Elimina el artículo con el ID correspondiente del carrito
    deleteFavsItem(state, action) {
      const itemId = action.payload;
      state.favorites = state.favorites.filter((item) => item._id !== itemId);
    },

    getCartItems(state, action) {
      state.cart = action.payload;
    },
    // Mantén los elementos existentes en el carrito y agrega uno nuevo
    addToCart(state, action) {
      const newItem = action.payload;
      state.cart = [...state.cart, newItem];
    },

    // Elimina el artículo con el ID correspondiente del carrito
    deleteCartItem(state, action) {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item._id !== itemId);
    },
  },
});

export const {
  getCartItems,
  addToCart,
  deleteCartItem,
  getFavsItems,
  addToFavorites,
  deleteFavsItem,
} = cartSlice.actions;

export default cartSlice.reducer;
