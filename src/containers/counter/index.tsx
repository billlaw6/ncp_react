import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
// import { RouteComponentProps } from "react-router";
import { increment, decrement } from "../../actions/counter";
import { State } from "../../reducers";

const Counter = (props: StateProps & DispatchProps) => (
  <div>
    Counter: {props.count}
    <button onClick={props.increment}>+</button>
    <button onClick={props.decrement}>-</button>
  </div>
);

interface StateProps {
  count: number;
}

interface DispatchProps {
  increment: () => void;
  decrement: () => void;
}

const mapStateToProps = (state: State) => ({
  counter: state.counter
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
