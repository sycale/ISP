import React from "react";
import { withRouter } from "react-router";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Progress } from "reactstrap";

class Rate extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">
              Food:
              <Progress value={this.props.rate.food} />
              Price:
              <Progress value={this.props.rate.price} />
              Service:
              <Progress value={this.props.rate.service} />
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Review Message: {this.props.rate.message}
            </CardSubtitle>
            <CardText>
              <h5>
                Owner:
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    this.props.history.push("/profile", this.props.rate.user)
                  }
                >
                  {this.props.rate.user.username}
                </span>
              </h5>
              <h5>
                Place:
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    this.props.history.push(
                      "/profile-page",
                      this.props.rate.place
                    );
                  }}
                >
                  {this.props.rate.place.name}
                </span>
              </h5>
              <span>Rate time: {this.props.rate.date_created}</span>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(Rate);
