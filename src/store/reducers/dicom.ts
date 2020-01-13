import { SearchFormI, ExamIndexListI } from "../../constants/interface";
import * as types from "../action-types";
import moment from "moment";
import { submitExamIndexSearchAction, setExamIndexListAction } from "../actions/dicom";

const defaultExamIndexSearch: SearchFormI = {
  dtRange: [new Date(new Date().getTime() - 6 * 24 * 3600 * 1000), new Date()],
  keyword: "exam index",
  fields: ["patient_name"],
};
const examSearchReducer = (
  state = defaultExamIndexSearch,
  action: ReturnType<typeof submitExamIndexSearchAction>,
) => {
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SUBMIT_EXAM_INDEX_SEARCH_FORM:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

const defaultExamIndexList: ExamIndexListI[] = [];
const examIndexListReducer = (
  state = defaultExamIndexList,
  action: ReturnType<typeof setExamIndexListAction>,
) => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_EXAM_INDEX_LIST:
      return action.payload;
    default: {
      return state;
    }
  }
};
export { examSearchReducer, examIndexListReducer };
