import React, { ChangeEventHandler } from 'react';

declare interface IState {
    isChecked: boolean;
    content: string;
}

class Edit extends React.Component {
    state: IState = {
        isChecked: false,
        content: '',
    };

    onCheckboxValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            isChecked: e.target.checked,
        });
    };

    onContentValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            content: e.target.value,
        });
    };

    onSave = () => {
        console.log(this.state);
    };

    render() {
        return (
            <div className="edit">
                <div>
                    <input
                        type="checkbox"
                        checked={this.state.isChecked}
                        onChange={this.onCheckboxValueChange}
                    />
                    <input
                        type="text"
                        value={this.state.content}
                        onChange={this.onContentValueChange}
                    />
                </div>
                <div>
                    <button>取消</button>
                    <button onClick={this.onSave}>确定</button>
                </div>
            </div>
        );
    }
}

export default Edit;
