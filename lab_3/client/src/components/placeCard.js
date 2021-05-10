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
} from "reactstrap";
import { withRouter } from "react-router";

class PlaceCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      value: null,
      err: null,
    };
  }

  handleValueInput(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleMessageInput(e) {
    this.setState({
      message: e.target.value,
    });
  }

  validateValues() {
    return (
      /^\d+$/.test(this.state.value) &&
      this.state.value.length <= 3 &&
      parseInt(this.state.value) < 101 &&
      !!this.state.message.length
    );
  }

  handleSendRate() {
    if (this.validateValues())
      this.props.onRatePlace(
        this.props.place.id,
        parseInt(this.state.value),
        this.state.message
      );
    else
      this.setState({
        err: "Cant validate, not a digit or value more than 100",
      });
  }

  render() {
    return (
      <Card className="w-25 align-self-center mt-3">
        <CardBody>
          <CardTitle
            onClick={() =>
              this.props.history.push("/profile-page", this.props.place)
            }
            tag="h5"
          >
            {this.props.place.name}
          </CardTitle>
          <CardText>{this.props.place.description}</CardText>
          <Input
            placeholder="Put here your rate value"
            onInput={(e) => this.handleValueInput(e)}
          />
          <Input
            placeholder="Put here your rate message"
            onInput={(e) => this.handleMessageInput(e)}
          />
          <Button onClick={() => this.handleSendRate()}>Rate</Button>
          {this.state.err && <Alert color="danger">{this.state.err}</Alert>}
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onRatePlace: (placeId, value, message) =>
    dispatch(ratePlace(placeId, value, message)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaceCard)
);
