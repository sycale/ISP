import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AUTH_USER } from "./actions/types";
import Header from "./components/header";
import Welcome from "./components/welcome";
import Signin from "./components/auth/signin";
import Signout from "./components/auth/signout";
import Signup from "./components/auth/signup";
import { PrivateRoute } from "./components/auth/require_auth";
import reducers from "./reducers";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Market from "./components/market";
import PlaceProfile from "./components/place";
import userProfile from "./components/userProfile";
import Account from "./components/account";
import Rates from "./components/rates";
import "bootstrap/dist/css/bootstrap.min.css";
import newPlace from "./components/newPlace";
import "./style/style.css";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider>
        <div>
          <Header />
          <Route path="/" exact={true} component={Welcome} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/market" component={Market} />
          <PrivateRoute path="/profile-page" component={PlaceProfile} />
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute path="/profile" component={userProfile} />
          <PrivateRoute path="/rates" component={Rates} />
          <PrivateRoute path="/new_place" component={newPlace} />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
