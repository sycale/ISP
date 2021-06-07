import React from "react";
import { Jumbotron, Button, Container } from "reactstrap";

export default () => {
  return (
    <Container>
      <Jumbotron>
        <h1 className="display-3">Hello, User!</h1>
        <p className="lead">
          This website is kind of a food agregator so u can add your places and then rate all the others
        </p>
        <hr className="my-2" />
        <p>Sign in/up to check up the realization</p>
        <p className="lead">
          <Button
            color="primary"
            onClick={() =>
              (window.location.href = "https://lgbt.foundation/donate")
            }
          >
            Click here to donate python devs
          </Button>
        </p>
      </Jumbotron>
    </Container>
  );
};
