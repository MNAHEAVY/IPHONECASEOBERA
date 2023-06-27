import {
  FILTERED_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CHECK_USER,
  GET_ALL_USERS,
  GET_VALUES,
  GET_USER,
} from "./actions";

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

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload], // Agregar elemento al carrito
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload), // Eliminar elemento del carrito
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [], // Vaciar el carrito
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        products: action.payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
        users: action.payload,
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

    case GET_VALUES:
      return {
        ...state,
        values: action.payload,
      };

    case CHECK_USER:
      return {
        ...state,
        checkUser: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { productId: action.payload, quantity: 1 }],
      };

    default:
      return state;
  }
}
