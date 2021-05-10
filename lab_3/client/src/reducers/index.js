import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import authReducer from "./auth_reducer";
import productsReducer from "./products_reducer";
import { rateReducer } from "./rateReducer";
import userReducer from "./user_reducer";

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  products: productsReducer,
  user: userReducer,
  rates: rateReducer,
});

export default rootReducer;
