import React from "react";
import { Jumbotron, Button, Container } from "reactstrap";

export default () => {
  return (
    <Container>
      <Jumbotron>
        <h1 className="display-3">Hello, Kovaliov!</h1>
        <p className="lead">
          Хорошая лаба, но мне было немного лень делать ее максимально идеальной
          + бюджет ограничен был)
        </p>
        <hr className="my-2" />
        <p>Если что, то я могу вам показать свой крутой проект</p>
        <p className="lead">
          <Button
            color="primary"
            onClick={() =>
              (window.location.href = "https://lgbt.foundation/donate")
            }
          >
            Нажмите сюда, чтобы поддержать питонистов
          </Button>
        </p>
      </Jumbotron>
    </Container>
  );
};
