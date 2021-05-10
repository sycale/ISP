import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container } from "reactstrap";
import { getRates } from "../actions";
import Rate from "./rate";

class Rates extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  generateRates(owner, place, value, message, key) {
    return (
      <Rate
        owner={owner}
        place={place}
        value={value}
        message={message}
        key={key}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.props.rates && (
          <div>
            {this.props.rates.map((rate) =>
              this.generateRates(
                rate.user,
                rate.place,
                rate.value,
                rate.message
              )
            )}
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  rates: state.rates.rates,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(getRates()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Rates));
