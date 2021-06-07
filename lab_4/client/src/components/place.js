import React from "react";
import { connect } from "react-redux";
import { Jumbotron, Container, Button } from "reactstrap";
import { deletePlace, getPlaceRates } from "../actions";
import Rate from "./rate";

class PlaceProfile extends React.Component {
  componentDidMount() {
    this.props.onMount(this.props.location.state.id);
  }
  render() {
    return (
      <Container>
        <Jumbotron fluid>
          <Container fluid className="d-flex flex-column">
            {this.props.user && this.props.user.role === "admin" && (
              <Button
                className="align-self-end"
                onClick={() => {
                  this.props.onDeletePlace(this.props.location.state.id);
                  this.props.history.push("/market");
                }}
              >
                Delete place
              </Button>
            )}

            <h1 className="display-3">{this.props.location.state.name}</h1>
            <p className="lead">{this.props.location.state.description}</p>
            <p>
              Owner:
              <span
                className="cursor-pointer redirect-cell"
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
            {!!this.props.err && !this.props.rates && (
              <div
                className="w-100"
                style={{
                  backgroundColor: "#fda7a7",
                  borderRadius: "10px",
                  marginTop: "20px",
                  padding: "10px",
                }}
                color="danger"
              >
                {this.props.err}
              </div>
            )}

            {this.props.rates &&
              this.props.rates.map((rate) => {
                return <Rate rate={rate} />;
              })}
          </Container>
        </Jumbotron>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rates: state.products.place_rates,
    err: state.rates.err,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onMount: (data) => dispatch(getPlaceRates(data)),
  onDeletePlace: (placeId) => dispatch(deletePlace(placeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceProfile);
