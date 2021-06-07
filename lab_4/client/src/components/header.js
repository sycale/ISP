import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo } from "../actions";

class Header extends Component {
  componentDidMount() {
    this.props.onMount();
  }
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li key={2} className="nav-item">
          <Link className="nav-link" to="/market">
            Market
          </Link>
        </li>,
        <li key={4} className="nav-item">
          <Link className="nav-link" to="/rates">
            Rates
          </Link>
        </li>,
        <li key={3} className="nav-item">
          <Link className="nav-link" to="/account">
            My profile
          </Link>
        </li>,
        <li key={1} className="nav-item">
          <Link className="nav-link" to="/signout">
            Sign Out
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key={1} className="nav-item">
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>,
        <li key={2} className="nav-item">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <ul className="nav navbar-nav d-flex flex-row">{this.renderLinks()}</ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.user,
  };
};

export const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(getUserInfo());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
