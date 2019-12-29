import React from 'react';
import { IStoreState, IExamIndexList, ISearchForm } from '../../constants/interface';
import { submitExamIndexSearchAction, setExamIndexListAction } from '../../store/actions/dicom';
import ExamIndexTable from './components/ExamIndexTable';
import SearchForm from './components/SearchForm';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state: IStoreState) => {
    // console.log(state);
    return {
        searchForm: state.examSearchForm,
        examIndexList: state.examIndexList,
    };
};
const mapDispatchToProps = {
    submitExamIndexSearchAction,
    setExamIndexListAction,
};
type IDispatchProps = typeof mapDispatchToProps

type IProps = ReturnType<typeof mapStateToProps> & IDispatchProps;

class ExamIndexManage extends React.Component<IProps, object> {
    readonly state = {
        fields: {
            dtRange: {
                value: [
                    moment('2019-12-22').startOf('day'),
                    moment('2019-12-25').endOf('day'),
                ]
            },
            keyword: {
                value: '',
            },
        },
        examIndexData: [],
    }
    componentDidMount() {
        console.log(this.props);
        console.log(this.props.examIndexList);
    }
    handleFormSubmit = (submitedFormData: ISearchForm) => {
        console.log('handle submit');
        this.props.submitExamIndexSearchAction(submitedFormData);
    }
    render() {
        console.log(this.state);
        const { fields } = this.state;
        return (
            <div>
                ExamIndexManage
                <SearchForm fields={fields} onSubmit={this.handleFormSubmit}></SearchForm>
                {/* {this.props.examIndexList.map((item, index) => {
                    console.log(item);
                })} */}
                <ExamIndexTable examIndexData={this.state.examIndexData}></ExamIndexTable>
            </div>
        )
    }
}

// export default (ExamIndexManage);
export default connect(mapStateToProps, mapDispatchToProps)(ExamIndexManage);