import React from 'react';
import { CanvasData } from '../../typings';

// Type和Interface大部分场合可混用，细节差别看文档
// type Props = {
//     label: string;
//     count: number;
//     onIncrement: () => void;
// };

interface Props {
    data: CanvasData;
}

interface State {
    data: CanvasData;
}

class Canvas extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { data: this.props.data }
    }

    render() {
        return (
            <div className="Canvas">
                <a href="/">Canvas</a>
                <span>{this.props.data.label}</span>
                <span>{this.state.data.label}</span>
            </div>
        );
    }
}
export default Canvas;
