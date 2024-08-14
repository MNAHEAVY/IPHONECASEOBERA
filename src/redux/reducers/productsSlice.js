import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  allProducts: [],
  prodById: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    getAllProducts(state, action) {
      state.allProducts = action.payload;
      const products = action.payload.slice(); // Clonar el array para no modificar el original
      products.sort((a, b) => b.precioBase - a.precioBase); // Ordenar por precio de menor a mayor
      state.products = products;
    },

    getProductById(state, action) {
      // Manejar el estado después de obtener un producto por su ID exitosamente
      state.prodById = action.payload;
    },

    putProd(state, action) {
      // Manejar el estado después de actualizar un producto exitosamente
      const updatedProduct = action.payload;
      state.allProducts = state.allProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      state.prodById = updatedProduct;
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

export const { getAllProducts, getProductById, putProd, deleteItem, createProd } =
  productsSlice.actions;

export default productsSlice.reducer;
