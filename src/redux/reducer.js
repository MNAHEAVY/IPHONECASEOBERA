import {
  FILTERED_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
} from "./actions";

const initialState = {
  products: [],
  allProducts: [],
  prodById: {},
  filteredProducts: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        products: action.payload,
      };

    case FILTERED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        prodById: action.payload,
      };

    default:
      return state;
  }
}
