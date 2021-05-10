import React from "react";
import { connect } from "react-redux";
import { Container, Input, Button } from "reactstrap";
import { createPlace } from "../actions";

class NewPlace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      place_name: "",
      place_description: "",
    };
  }
  render() {
    return (
      <Container className="w-25 mt-5">
        <Input
          placeholder="Put here place name"
          onInput={(e) => this.setState({ place_name: e.target.value })}
          className="mb-3"
        />
        <Input
          placeholder="Put here place description"
          onInput={(e) => this.setState({ place_description: e.target.value })}
          className="mb-3"
        />

        <Button
          onClick={() => {
            this.props.onCreatePlace({
              name: this.state.place_name,
              description: this.state.place_description,
            });
          }}
        >
          Create
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onCreatePlace: (data) => dispatch(createPlace(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPlace);
