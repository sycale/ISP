import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { renderTextField } from "./form_helpers";
import RaisedButton from "material-ui/RaisedButton";
import { Container } from "reactstrap";

class SigninForm extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops: </strong>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        {this.renderAlert()}
        <form
          onSubmit={handleSubmit}
          className="container d-flex flex-column align-items-center"
        >
          <Field
            label="Username"
            name="login"
            component={renderTextField}
            type="text"
          />

          <Field
            label="Password"
            name="password"
            component={renderTextField}
            type="password"
          />

          <RaisedButton
            type="submit"
            label="Sign In"
            primary={true}
            labelColor={"#FFFFFF"}
            className="mt-5"
          />
        </form>
      </Container>
    );
  }
}

export default reduxForm({
  form: "signin",
})(SigninForm);
