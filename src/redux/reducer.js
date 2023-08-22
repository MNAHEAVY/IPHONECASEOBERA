import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  allProducts: [],
  users: [],
  allUsers: [],
  prodById: {},
  filteredProducts: [],
  checkUser: {},
  values: {},
  user: {},
  favorites: [],
  cart: [],
};

const appSlice = createSlice({
  name: "app",
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

    getAllProducts(state, action) {
      state.allProducts = action.payload;
      state.products = action.payload;
    },

    getValues(state, action) {
      state.values = action.payload;
    },
    checkUserExists(state, action) {
      // Manejar el estado después de verificar si el usuario existe exitosamente
      // No se realiza ningún cambio en el estado en este caso
    },

    checkUserAdmin(state, action) {
      state.checkUser = action.payload;
    },

    getProductById(state, action) {
      // Manejar el estado después de obtener un producto por su ID exitosamente
      state.prodById = action.payload;
    },

    filteredProducts(state, action) {
      // Manejar el estado después de obtener los productos filtrados exitosamente
      state.products = action.payload;
    },

    getAllUsers(state, action) {
      // Manejar el estado después de obtener todos los usuarios exitosamente
      state.allUsers = action.payload;
      state.users = action.payload;
    },

    getUser(state, action) {
      // Manejar el estado después de obtener un usuario por su correo exitosamente
      state.user = action.payload;
    },
    putProd(state, action) {
      // Manejar el estado después de actualizar un producto exitosamente
      const updatedProduct = action.payload;
      state.allProducts = state.allProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      state.prodById = updatedProduct;
    },

    addCase(state, action) {
      // Manejar el estado después de actualizar los valores exitosamente
      state.values = action.payload;
    },

    deleteItem(state, action) {
      // Manejar el estado después de eliminar un producto exitosamente
      const deletedItemId = action.payload;
      state.allProducts = state.allProducts.filter(
        (product) => product.id !== deletedItemId
      );
      state.prodById = {};
    },

    createProd(state, action) {
      // Manejar el estado después de crear un producto exitosamente
      const createdProduct = action.payload;
      state.allProducts.push(createdProduct);
      state.products.push(createdProduct);
    },
  },
});

export const {
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
  getCartItems,
  putVal,
  deleteItem,
  createProd,
  deleteFavsItem,
  getFavsItems,
} = appSlice.actions;

export default appSlice.reducer;
