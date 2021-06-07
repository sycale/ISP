import { GET_ALL_RATES_FAILED, GET_ALL_RATES_SUCCESS } from "../actions/types";

export const rateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RATES_SUCCESS:
      return {
        ...state,
        rates: action.payload,
      };
    case GET_ALL_RATES_FAILED:
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
};
