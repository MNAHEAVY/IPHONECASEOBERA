// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
//   allProducts: [],
//   prodById: {},
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState,

//   reducers: {
//     getAllProducts(state, action) {
//       state.allProducts = action.payload;
//       const products = action.payload.slice(); // Clonar el array para no modificar el original
//       products.sort((a, b) => b.precioBase - a.precioBase); // Ordenar por precio de menor a mayor
//       state.products = products;
//     },

//     getProductById(state, action) {
//       // Manejar el estado después de obtener un producto por su ID exitosamente
//       state.prodById = action.payload;
//     },

//     putProd(state, action) {
//       // Manejar el estado después de actualizar un producto exitosamente
//       const updatedProduct = action.payload;
//       state.allProducts = state.allProducts.map((product) =>
//         product.id === updatedProduct.id ? updatedProduct : product
//       );
//       state.prodById = updatedProduct;
//     },

//     deleteItem(state, action) {
//       // Manejar el estado después de eliminar un producto exitosamente
//       const deletedItemId = action.payload;
//       state.allProducts = state.allProducts.filter(
//         (product) => product.id !== deletedItemId
//       );
//       state.prodById = {};
//     },

//     createProd(state, action) {
//       // Manejar el estado después de crear un producto exitosamente
//       const createdProduct = action.payload;
//       state.allProducts.push(createdProduct);
//       state.products.push(createdProduct);
//     },
//   },
// });

// export const { getAllProducts, getProductById, putProd, deleteItem, createProd } =
//   productsSlice.actions;

// export default productsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  allProducts: [],
  prodById: {},
};

function getMinVariantPrice(product) {
  if (!product?.variants?.length) return 0;

  const prices = product.variants
    .map((variant) => Number(variant?.price) || 0)
    .filter((price) => price > 0);

  return prices.length ? Math.min(...prices) : 0;
}

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    getAllProducts(state, action) {
      state.allProducts = action.payload;
      state.products = action.payload.slice();
    },

    getProductById(state, action) {
      state.prodById = action.payload;
    },

    putProd(state, action) {
      const updatedProduct = action.payload;

      state.allProducts = state.allProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );

      state.products = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );

      if (state.prodById?.id === updatedProduct.id) {
        state.prodById = updatedProduct;
      }
    },

    deleteItem(state, action) {
      const deletedItemId = action.payload;

      state.allProducts = state.allProducts.filter(
        (product) => product.id !== deletedItemId,
      );

      state.products = state.products.filter((product) => product.id !== deletedItemId);

      if (state.prodById?.id === deletedItemId) {
        state.prodById = {};
      }
    },

    createProd(state, action) {
      const createdProduct = action.payload;
      state.allProducts.push(createdProduct);
      state.products.push(createdProduct);
    },

    sortProductsByPriceAsc(state) {
      state.products = state.products
        .slice()
        .sort((a, b) => getMinVariantPrice(a) - getMinVariantPrice(b));
    },

    sortProductsByPriceDesc(state) {
      state.products = state.products
        .slice()
        .sort((a, b) => getMinVariantPrice(b) - getMinVariantPrice(a));
    },

    resetProducts(state) {
      state.products = state.allProducts.slice();
    },
  },
});

export const {
  getAllProducts,
  getProductById,
  putProd,
  deleteItem,
  createProd,
  sortProductsByPriceAsc,
  sortProductsByPriceDesc,
  resetProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
