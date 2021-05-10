import {
  FETCH_GET_USER_PLACES,
  FETCH_GET_USER_PLACES_ERROR,
  FETCH_GET_USER_PLACES_SUCCESS,
  SET_USER_INFO,
} from "../actions/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GET_USER_PLACES:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GET_USER_PLACES_SUCCESS:
      return {
        ...state,
        pending: false,
        user_places: action.payload,
      };
    case FETCH_GET_USER_PLACES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case SET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
