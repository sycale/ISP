import {
  FETCH_GET_PRODUCTS,
  FETCH_GET_PRODUCTS_ERROR,
  FETCH_GET_PRODUCTS_SUCCESS,
  FETCH_GET_USER_PLACES_ERROR,
  FETCH_GET_USER_PLACES_SUCCESS,
  FETCH_GET_USER_PLACES,
} from "../actions/types";

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    case FETCH_GET_PRODUCTS:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        places: action.payload,
        pending: false,
      };
    default:
      return state;
  }
};

export default productsReducer;
