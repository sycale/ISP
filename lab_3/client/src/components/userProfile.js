import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserPlaces } from "../actions";
import { Jumbotron, Container } from "reactstrap";

class UserProfile extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        {this.props.location.state && (
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">
                User email: {this.props.location.state.email}
              </h1>
              <p className="lead">
                User role: {this.props.location.state.role}
              </p>
              <p className="lead">
                {" "}
                User name: {this.props.location.state.username}
              </p>
            </Container>
          </Jumbotron>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
