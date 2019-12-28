import React from 'react';
import { IStoreState, IExamIndexList } from '../../constants/interface';
import { submitExamIndexSearchAction, setExamIndexListAction } from '../../store/actions/dicom';
import ExamIndexTable from './components/ExamIndexTable';
import SearchForm from './components/SearchForm';
import { connect } from 'react-redux';

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

type IState = {
    examIndexData: IExamIndexList[];
}

class ExamIndexManage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            examIndexData: []
        }
    }
    componentDidMount() {
        console.log(this.props);
        console.log(this.props.examIndexList);
    }
    handleSubmit() {
        console.log('handle submit');
    }
    render() {
        return (
            <div>
                ExamIndexManage
                <SearchForm onSubmit={this.handleSubmit}></SearchForm>
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