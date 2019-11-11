import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { increment, decrement } from '../../actions/counter'
// import { IState } from '../../reducers'
import { IStoreState } from '../../constants/store.d'

const Counter = (props: RouteComponentProps<any> & StateProps & DispatchProps) => (
  <div>
    Counter: {props.count}
    <button onClick={props.increment}>+</button>
    <button onClick={props.decrement}>-</button>
  </div>
)

interface StateProps {
  count: number
}

interface DispatchProps {
  increment: () => void
  decrement: () => void
}

const mapStateToProps = (state: IStoreState) => ({
  count: state.count,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
})

// 此处不能用范型
// export default connect<StateProps, DispatchProps, RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(Counter)
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

