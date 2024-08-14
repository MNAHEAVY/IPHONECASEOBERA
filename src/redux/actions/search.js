import axios from "axios";

import { getAllProducts, setSearchedProduct } from "../reducers/searchSlice";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";
// const API_BASE_URL = "http://localhost:3001";

// Products Actions
// Get
export const getAllProductsAction = () => {
  return async function (dispatch) {
    const products = await axios(`${API_BASE_URL}/products`);
    return dispatch(getAllProducts(products.data));
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
