import React from 'react';
import { connect } from 'react-redux';
import DicomManage from './components/DicomManage';
import { IDicomInfo, IDicomSearchState, IStoreState } from '../../constants/store.d';
import {
    dicomSearchRequstedAction,
    dicomSearchSucceededAction,
    dicomSearchFailedAction,
    DICOM_SEARCH_FAILED_ACTION,
    DICOM_SEARCH_REQUESTED_ACTION,
    DICOM_SEARCH_SUCCEEDED_ACTION
} from '../../actions/dicom';

const mapStateToProps = (state: IStoreState) => {
    return {
        dicomList: state.dicomList,
    };
};
const mapDispatchToProps = {
    dicomSearchRequstedAction,
    dicomSearchSucceededAction,
    dicomSearchFailedAction,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
// state作为本页面或组件的默认值，使其不依赖外部变量。
type IState = {
    fields: {
        dtRange: Array<Date>;
        keyword: string;
        status: string;
        count: number;
        results: Array<IDicomInfo>
    }
}
class Dicom extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: props.dicomList,
        }
    }
    handleFormChange = (changedFields: IDicomSearchState) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
        this.props.dicomSearchSucceededAction(changedFields);
    }

    handleFormSubmit = (submitedFormData: IDicomSearchState) => {
        console.log(submitedFormData);
        this.props.dicomSearchRequstedAction(submitedFormData);
    }
    render() {
        const { fields } = this.state;
        console.log(fields);
        return (
            <>
                <DicomManage fields={fields} onChange={this.handleFormChange} onSubmit={this.handleFormSubmit} />
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dicom);