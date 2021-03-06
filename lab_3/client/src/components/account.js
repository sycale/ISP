import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserPlaces } from "../actions";
import { Jumbotron, Container } from "reactstrap";

class Account extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <Container>
        {this.props.user && (
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">User email: {this.props.user.email}</h1>
              <p className="lead">User role: {this.props.user.role}</p>
              <p className="lead"> User name: {this.props.user.username}</p>
            </Container>
          </Jumbotron>
        )}
        {this.props.errors && <div> {this.props.errors} </div>}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  user_places: state.user.user_places,
  errors: state.user.error,
});
const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(getUserInfo());
    dispatch(getUserPlaces());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
