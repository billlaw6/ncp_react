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
            fields: {
                dtRange: [new Date((new Date().getTime() - 3 * 24 * 3600 * 1000)), new Date()],
                keyword: 'father init',
                status: '',
                count: 0,
                results: [],
            }
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
        this.props.dicomSearchSucceededAction(submitedFormData);
    }
    render() {
        const { fields } = this.state;
        return (
            <>
                <DicomManage fields={fields} onChange={this.handleFormChange} onSubmit={this.handleFormSubmit} />
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dicom);