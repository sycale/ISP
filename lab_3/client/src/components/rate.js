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
    console.log(this.props);
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">
              <Progress value={this.props.value} />
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Review Message: {this.props.message}
            </CardSubtitle>
            <CardText>
              <h5>
                Owner:
                <span
                  onClick={() =>
                    this.props.history.push("/profile", this.props.owner)
                  }
                >
                  {this.props.owner.username}
                </span>
              </h5>
              <h5>
                Place:
                <span
                  onClick={() => {
                    this.props.history.push("/profile-page", this.props.place);
                  }}
                >
                  {this.props.place.name}
                </span>
              </h5>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(Rate);
