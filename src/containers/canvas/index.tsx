import React from 'react';
import { changeCanvasAction } from '../../actions/canvas'
import { IStoreState } from "../../constants/store.d";

const mapStateToProps = (storeState: IStoreState) => ({
    canvas: storeState.canvas
})

type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    changeCanvasAction
}

type IDispatchProps = typeof mapDispatchToProps;

type IProps = IStoreState & IDispatchProps;
class Canvas extends React.Component<IProps> {

    render() {
        return (
            <div className="Canvas">
                <a href="/">Canvas</a>
                <span>this.props.data.label</span>
                <span>this.state.data.label</span>
            </div>
        );
    }
}
export default Canvas;
