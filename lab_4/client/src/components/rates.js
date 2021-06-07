import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container } from "reactstrap";
import { getRates } from "../actions";
import Rate from "./rate";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class Rates extends React.Component {
  state = {
    ddOpen: false,
    sortType: null,
  };

  componentDidMount() {
    this.props.onMount();
  }

  generateRates(rate) {
    return <Rate rate={rate} />;
  }

  render() {
    return (
      <Container>
        <Dropdown
          isOpen={this.state.ddOpen}
          toggle={() => this.setState({ ddOpen: !this.state.ddOpen })}
        >
          <DropdownToggle caret>Choose sort type</DropdownToggle>
          <DropdownMenu>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.setState({
                  sortType: "asc",
                });
              }}
            >
              Ascending
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.setState({
                  sortType: "desc",
                });
              }}
            >
              Descending
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {this.props.rates && (
          <div>
            {this.props.rates
              .sort((a, b) => {
                return this.state.sortType === "asc"
                  ? a.value - b.value
                  : b.value - a.value;
              })
              .map((rate) => this.generateRates(rate))}
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
