import React from "react";
import { changeCanvasAction } from "../../store/actions/canvas";
import { StoreStateI } from "../../constants/interface";

import { DatePicker } from "antd";

const mapStateToProps = (storeState: StoreStateI) => ({
  // canvas: storeState.canvas
});

type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  changeCanvasAction,
};

type IDispatchProps = typeof mapDispatchToProps;

type IProps = StoreStateI & IDispatchProps;
class Canvas extends React.Component<IProps> {
  render() {
    return (
      <div className="Canvas">
        <a href="/">Canvas</a>
        <span>this.props.data.label</span>
        <span>this.state.data.label</span>
        <DatePicker />
      </div>
    );
  }
}
export default Canvas;
