import React from "react";
import { connect } from "react-redux";
import { ratePlace } from "../actions";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Input,
  Alert,
  Progress,
} from "reactstrap";
import { withRouter } from "react-router";

class PlaceCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      food: null,
      price: null,
      service: null,
      err: null,
    };
  }

  validateValues() {
    return (
      /^\d+$/.test(this.state.food) &&
      /^\d+$/.test(this.state.price) &&
      /^\d+$/.test(this.state.service) &&
      this.state.food.length <= 3 &&
      parseInt(this.state.food) < 101 &&
      this.state.price.length <= 3 &&
      parseInt(this.state.price) < 101 &&
      this.state.service.length <= 3 &&
      parseInt(this.state.service) < 101 &&
      !!this.state.message.length
    );
  }

  handleSendRate() {
    if (this.validateValues())
      this.props.onRatePlace(
        this.props.place.id,
        parseInt(this.state.food),
        parseInt(this.state.price),
        parseInt(this.state.service),
        this.state.message
      );
    else
      this.setState({
        err: "Cant validate, not a digit or value more than 100",
      });
  }

  render() {
    return (
      <Card className="w-25 align-self-center mt-3" key={this.props.key}>
        <CardBody>
          <CardTitle
            onClick={() =>
              this.props.history.push("/profile-page", this.props.place)
            }
            tag="h5"
            className="cursor-pointer"
          >
            {this.props.place.name}
          </CardTitle>
          <CardText>{this.props.place.description}</CardText>
          {this.props.place.rating && (
            <CardText>
              Food:
              <Progress
                value={this.props.place.rating.food}
                max={this.props.place.rating.max}
              />
              Price:
              <Progress
                value={this.props.place.rating.price}
                max={this.props.place.rating.max}
              />
              Service:
              <Progress
                value={this.props.place.rating.service}
                max={this.props.place.rating.max}
              />
            </CardText>
          )}
          <Input
            className="mt-3"
            placeholder="Put here your food rate value"
            onInput={(e) =>
              this.setState({
                food: e.target.value,
              })
            }
          />
          <Input
            className="mt-3"
            placeholder="Put here your price rate value"
            onInput={(e) =>
              this.setState({
                price: e.target.value,
              })
            }
          />
          <Input
            className="mt-3"
            placeholder="Put here your service rate value"
            onInput={(e) =>
              this.setState({
                service: e.target.value,
              })
            }
          />
          <Input
            className="mt-3"
            placeholder="Put here your rate message"
            onInput={(e) =>
              this.setState({
                message: e.target.value,
              })
            }
          />
          <Button className="mt-3" onClick={() => this.handleSendRate()}>
            Rate
          </Button>
          {this.state.err && (
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
              {this.state.err}
            </div>
          )}
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onRatePlace: (placeId, food_rate, price_rate, service_rate, message) =>
    dispatch(ratePlace(placeId, food_rate, price_rate, service_rate, message)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaceCard)
);
