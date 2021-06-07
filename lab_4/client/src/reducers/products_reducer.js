import {
  DELETE_PLACE_SUCCESS,
  FETCH_GET_PRODUCTS,
  FETCH_GET_PRODUCTS_ERROR,
  FETCH_GET_PRODUCTS_SUCCESS,
  GET_ALL_RATES_FAILED,
  GET_ALL_RATES_SUCCESS,
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
    case GET_ALL_RATES_SUCCESS:
      return {
        ...state,
        place_rates: action.payload,
      };
    case GET_ALL_RATES_FAILED:
      return {
        ...state,
        err: action.payload,
      };
    case DELETE_PLACE_SUCCESS:
      return {
        ...state,
        place: state.places.filter((place) => place.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productsReducer;
