import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { editDraftAction } from '../../actions/';
import { IDraftState, IStoreState } from '../../constants/store.d';

const mapStateToProps = (storeState: IStoreState) => ({
    draft: storeState.draft,
});

type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    editDraftAction,
};

type IDispatchProps = typeof mapDispatchToProps;

type IProps = IStateProps & IDispatchProps;

class Edit extends React.Component<IProps> {

    onCheckboxValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.props.editDraftAction({
            ...this.props.draft,
            isChecked: e.target.checked,
        });
    };

    onContentValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.props.editDraftAction({
            ...this.props.draft,
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
                        checked={this.props.draft.isChecked}
                        onChange={this.onCheckboxValueChange}
                    />
                    <input
                        type="text"
                        value={this.props.draft.content}
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
