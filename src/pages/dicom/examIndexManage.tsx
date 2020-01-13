import React from "react";
import { StoreStateI, ExamIndexListI, SearchFormI } from "../../constants/interface";
import { submitExamIndexSearchAction, setExamIndexListAction } from "../../store/actions/dicom";
import ExamIndexTable from "./components/ExamIndexTable";
import ExamIndexList from "./components/ExamIndexList";
import SearchForm from "./components/SearchForm";
import { connect } from "react-redux";
import moment from "moment";

const mapStateToProps = (state: StoreStateI) => {
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
type IDispatchProps = typeof mapDispatchToProps;

type IProps = ReturnType<typeof mapStateToProps> & IDispatchProps;

// type IState = {
//     fields: SearchFormI;
//     examIndexData: ExamIndexListI[];
// }

class ExamIndexManage extends React.Component<IProps, any> {
  readonly state = {
    fields: {
      dtRange: {
        value: [moment("2019-12-22").startOf("day"), moment("2019-12-25").endOf("day")],
      },
      keyword: {
        value: "",
      },
    },
    examIndexData: [],
  };
  componentDidMount() {}
  handleFormSubmit = (submitedFormData: SearchFormI) => {
    console.log("submit");
    console.log(submitedFormData);
    this.props.submitExamIndexSearchAction(submitedFormData);
  };
  render() {
    console.log(this.props);
    const { fields } = this.state;
    return (
      <div>
        <SearchForm fields={fields} onSubmit={this.handleFormSubmit}></SearchForm>
        <ExamIndexTable examIndexData={this.props.examIndexList}></ExamIndexTable>
        <ExamIndexList examIndexData={this.props.examIndexList}></ExamIndexList>
      </div>
    );
  }
}

// export default (ExamIndexManage);
export default connect(mapStateToProps, mapDispatchToProps)(ExamIndexManage);
