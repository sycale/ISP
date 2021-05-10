import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchProducts } from "../actions";
import { Button, Container } from "reactstrap";
import PlaceCard from "./placeCard";

class Market extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onMount();
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  renderPlaceCard(place) {
    return <PlaceCard place={place} />;
  }

  render() {
    return (
      <Container className="d-flex flex-column">
        <Button
          className="w-25 align-self-center"
          onClick={() => this.props.history.push("/new_place")}
        >
          Add new place
        </Button>
        {this.props.places &&
          this.props.places.map((place) => {
            return this.renderPlaceCard(place);
          })}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  places: state.products.places,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(fetchProducts()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Market));
