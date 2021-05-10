import axios from "axios";
import {
  UNAUTH_USER,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_GET_PRODUCTS_SUCCESS,
  FETCH_GET_PRODUCTS,
  FETCH_GET_PRODUCTS_ERROR,
  FETCH_GET_USER_PLACES,
  FETCH_GET_USER_PLACES_ERROR,
  FETCH_GET_USER_PLACES_SUCCESS,
  SET_USER_INFO,
  GET_ALL_RATES_SUCCESS,
} from "./types";

export function signinUser({ login, password }) {
  return function (dispatch) {
    const request = axios.post("/auth", { login, password });
    request
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);

        dispatch({ type: AUTH_USER, payload: response.data.user });
        dispatch({ type: SET_USER_INFO, payload: response.data.user });
      })

      .catch(() => {
        dispatch(authError("bad login info"));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem("token");
  return {
    type: UNAUTH_USER,
  };
}

export function signupUser({ email, password, login, role }) {
  return function (dispatch) {
    axios
      .post("/register", { email, password, role, login })
      .then((response) => {
        dispatch({ type: AUTH_USER, payload: response });
        localStorage.setItem("token", response.data.access_token);
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export const fetchProducts = () => (dispatch) => {
  dispatch({ type: FETCH_GET_PRODUCTS });
  axios
    .get("/place", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      dispatch({
        type: FETCH_GET_PRODUCTS_SUCCESS,
        payload: response.data.places,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: FETCH_GET_PRODUCTS_ERROR,
        payload: response,
      });
    });
};

export function fetchMessage() {
  return function (dispatch) {
    axios
      .get("/", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        });
      });
  };
}

export const getUserInfo = () => (dispatch) => {
  axios
    .get("/user", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response);
      dispatch({
        type: SET_USER_INFO,
        payload: response.data,
      });
    });
};

export const getUserPlaces = () => (dispatch) => {
  dispatch({ type: FETCH_GET_USER_PLACES });
  axios
    .get("/user/places", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({
        type: FETCH_GET_USER_PLACES_SUCCESS,
        payload: response.data.user_places,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: FETCH_GET_USER_PLACES_ERROR,
        payload: response ? response.data.message : undefined,
      });
    });
};

export const ratePlace = (placeId, value, message) => (dispatch) => {
  axios
    .post(
      "/rate",
      {
        place_id: placeId,
        value,
        message,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => console.log(response))
    .catch(({ response }) => console.log(response));
};

export const getRates = () => (dispatch) => {
  axios
    .get("/rates", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({ type: GET_ALL_RATES_SUCCESS, payload: response.data.rates });
    })
    .then(({ response }) => {
      console.log(response);
    });
};

export const createPlace = (data) => (dispatch) => {
  axios.post("place", data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
