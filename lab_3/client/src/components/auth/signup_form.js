import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import { renderTextField } from "./form_helpers";
import { Container } from "reactstrap";

class SignupForm extends Component {
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
          autoComplete="off"
          className="d-flex flex-column align-items-center"
        >
          <Field
            label="Email"
            name="email"
            component={renderTextField}
            type="text"
            autoComplete="off"
          />

          <Field
            label="Login"
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

          <Field
            label="Password Confirmation"
            name="passwordConfirmation"
            component={renderTextField}
            type="password"
          />

          <Field
            label="Role"
            name="role"
            component={renderTextField}
            type="role"
          />

          <RaisedButton
            type="submit"
            label="Sign Up"
            primary={true}
            labelColor={"#FFFFFF"}
            className="mt-5"
          />
        </form>
      </Container>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords must match";
  }

  if (!values.email) {
    errors.email = "Please enter an email";
  }

  if (!values.password) {
    errors.password = "Please enter a password";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please confirm your password";
  }

  return errors;
};

export default reduxForm({
  form: "signup",
  validate,
})(SignupForm);
