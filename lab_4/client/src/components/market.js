import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchProducts, getRates } from "../actions";
import { Button, Container } from "reactstrap";
import PlaceCard from "./placeCard";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class Market extends React.Component {
  state = {
    places: [],
    ddOpen: false,
    sortType: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onMount();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.places) {
      this.setState({
        places: this.props.places.map((place) => {
          return {
            ...place,
            rating: this.props.rates
              ? {
                  food:
                    this.props.rates
                      .filter((rate) => rate.place.id === place.id)
                      .reduce((acc, val) => acc + val.food, 0) || 0,
                  price:
                    this.props.rates
                      .filter((rate) => rate.place.id === place.id)
                      .reduce((acc, val) => acc + val.price, 0) || 0,
                  service:
                    this.props.rates
                      .filter((rate) => rate.place.id === place.id)
                      .reduce((acc, val) => acc + val.service, 0) || 0,
                  max:
                    this.props.rates.filter(
                      (rate) => rate.place.id === place.id
                    ).length * 100 || 100,
                }
              : {
                  food: 0,
                  price: 0,
                  service: 0,
                  max: 100,
                },
          };
        }),
      });
    }
  }

  renderPlaceCard(place) {
    return <PlaceCard place={place} key={place.id} />;
  }

  render() {
    console.log(this.state.places);
    return (
      <Container className="d-flex flex-column">
        <Dropdown
          isOpen={this.state.ddOpen}
          toggle={() => this.setState({ ddOpen: !this.state.ddOpen })}
        >
          <DropdownToggle caret>Choose sorting type</DropdownToggle>
          <DropdownMenu>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.setState({
                  sortType: "Food",
                });
              }}
            >
              Food
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.setState({
                  sortType: "Service",
                });
              }}
            >
              Service
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.setState({
                  sortType: "Price",
                });
              }}
            >
              Price
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.setState({
                  sortType: "All",
                });
              }}
            >
              All
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {this.props.user && this.props.user.role === "admin" && (
          <Button
            className="w-25 align-self-center cursor-pointer"
            onClick={() => this.props.history.push("/new_place")}
          >
            Add new place
          </Button>
        )}
        {this.state.places &&
          this.state.places
            .sort((a, b) => {
              if (this.state.sortType === "All") {
                return (
                  (b.rating.food + b.rating.food + b.rating.service) /
                    b.rating.max -
                  (a.rating.food + a.rating.price + a.rating.service) /
                    a.rating.max
                );
              } else if (this.state.sortType === "Service") {
                return (
                  b.rating.service / b.rating.max -
                  a.rating.service / a.rating.max
                );
              } else if (this.state.sortType === "Price") {
                return (
                  b.rating.price / b.rating.max - a.rating.price / a.rating.max
                );
              } else if (this.state.sortType === "Food") {
                console.log("here");

                return (
                  b.rating.food / b.rating.max - a.rating.food / a.rating.max
                );
              }
              return a.id - b.id;
            })
            .map((place) => {
              return this.renderPlaceCard(place);
            })}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  places: state.products.places,
  rates: state.rates.rates,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(getRates());
    dispatch(fetchProducts());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Market));
