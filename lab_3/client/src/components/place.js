import React from "react";
import { connect } from "react-redux";
import { Jumbotron, Container } from "reactstrap";

class PlaceProfile extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">{this.props.location.state.name}</h1>
            <p className="lead">{this.props.location.state.description}</p>
            <p>
              Owner:
              <span
                onClick={() => {
                  this.props.history.push(
                    "/profile",
                    this.props.location.state.owner
                  );
                }}
              >
                {this.props.location.state.owner.username}
              </span>
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceProfile);
